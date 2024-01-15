import { getCreate2Address } from '@ethersproject/address'
import { keccak256, pack } from '@ethersproject/solidity'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

import {
  _10000,
  BigintIsh,
  defaultProtocolFeeDenominator,
  defaultSwapFee,
  MINIMUM_LIQUIDITY,
  ONE,
  ZERO,
} from '../constants'
import { ChainId } from '../constants'
import { InsufficientInputAmountError, InsufficientReservesError } from '../errors'
import { parseBigintIsh, sqrt } from '../utils'
import { Price } from './fractions/price'
import { TokenAmount } from './fractions/tokenAmount'
import { LiquidityMiningCampaign } from './liquidity-mining-campaign'
import { Token } from './token'
import { UniswapV2RoutablePlatform } from './trades/routable-platform'

const INITIAL_CACHE_STATE: Record<ChainId, any> = {
  [ChainId.MAINNET]: {},
  [ChainId.RINKEBY]: {},
  [ChainId.ARBITRUM_ONE]: {},
  [ChainId.ARBITRUM_RINKEBY]: {},
  [ChainId.ARBITRUM_GOERLI]: {},
  [ChainId.XDAI]: {},
  [ChainId.POLYGON]: {},
  [ChainId.GOERLI]: {},
  [ChainId.OPTIMISM_MAINNET]: {},
  [ChainId.OPTIMISM_GOERLI]: {},
  [ChainId.BSC_MAINNET]: {},
  [ChainId.BSC_TESTNET]: {},
  [ChainId.ZK_SYNC_ERA_MAINNET]: {},
  [ChainId.ZK_SYNC_ERA_TESTNET]: {},
}

let PAIR_ADDRESS_CACHE: {
  [supportedPlatformName: string]: {
    [chainId: number]: { [token0Address: string]: { [token1Address: string]: string } }
  }
} = {
  [UniswapV2RoutablePlatform.SWAPR.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.SUSHISWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.UNISWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.HONEYSWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.BAOSWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.LEVINSWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.QUICKSWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.PANCAKESWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.DFYN.name]: {
    ...INITIAL_CACHE_STATE,
  },
  [UniswapV2RoutablePlatform.BISWAP.name]: {
    ...INITIAL_CACHE_STATE,
  },
}

export class Pair {
  public readonly liquidityToken: Token
  private readonly tokenAmounts: [TokenAmount, TokenAmount]
  public readonly swapFee: BigintIsh = defaultSwapFee
  public readonly protocolFeeDenominator: BigintIsh = defaultProtocolFeeDenominator
  public readonly platform: UniswapV2RoutablePlatform
  public liquidityMiningCampaigns: LiquidityMiningCampaign[]

  /**
   * Returns true if the two pairs are equivalent, i.e. have the same address (calculated using create2).
   * @param other other pair to compare
   */
  public equals(other: Pair): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.liquidityToken.address === other.liquidityToken.address
  }

  public static getAddress(
    tokenA: Token,
    tokenB: Token,
    platform: UniswapV2RoutablePlatform = UniswapV2RoutablePlatform.SWAPR,
  ): string {
    const tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks
    const chainId = tokenA.chainId
    invariant(platform.supportsChain(chainId), 'INVALID_PLATFORM_CHAIN_ID')
    if (PAIR_ADDRESS_CACHE?.[platform.name]?.[chainId]?.[tokens[0].address]?.[tokens[1].address] === undefined) {
      PAIR_ADDRESS_CACHE = {
        ...PAIR_ADDRESS_CACHE,
        [platform.name]: {
          ...PAIR_ADDRESS_CACHE[platform.name],
          [chainId]: {
            ...PAIR_ADDRESS_CACHE[platform.name][chainId],
            [tokens[0].address]: {
              ...PAIR_ADDRESS_CACHE?.[platform.name]?.[chainId]?.[tokens[0].address],
              [tokens[1].address]: getCreate2Address(
                platform.factoryAddress[chainId] as string,
                keccak256(['bytes'], [pack(['address', 'address'], [tokens[0].address, tokens[1].address])]),
                platform.initCodeHash,
              ),
            },
          },
        },
      }
    }
    return PAIR_ADDRESS_CACHE[platform.name][chainId][tokens[0].address][tokens[1].address]
  }

  constructor(
    tokenAmountA: TokenAmount,
    tokenAmountB: TokenAmount,
    swapFee?: BigintIsh,
    protocolFeeDenominator?: BigintIsh,
    platform: UniswapV2RoutablePlatform = UniswapV2RoutablePlatform.SWAPR,
    liquidityMiningCampaigns: LiquidityMiningCampaign[] = [],
  ) {
    invariant(tokenAmountA.token.chainId === tokenAmountB.token.chainId, 'CHAIN_ID')
    const tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
      ? [tokenAmountA, tokenAmountB]
      : [tokenAmountB, tokenAmountA]

    this.platform = platform
    const liquidityTokenAddress = Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token, platform)
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, liquidityTokenAddress, 18, 'DXS', 'DXswap')
    this.protocolFeeDenominator = protocolFeeDenominator ? protocolFeeDenominator : defaultProtocolFeeDenominator
    this.tokenAmounts = tokenAmounts as [TokenAmount, TokenAmount]
    this.swapFee = swapFee ? swapFee : platform.defaultSwapFee
    this.liquidityMiningCampaigns = liquidityMiningCampaigns
  }

  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  public involvesToken(token: Token): boolean {
    return token.equals(this.token0) || token.equals(this.token1)
  }

  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  public get token0Price(): Price {
    return new Price({
      baseCurrency: this.token0,
      quoteCurrency: this.token1,
      denominator: this.tokenAmounts[0].raw,
      numerator: this.tokenAmounts[1].raw,
    })
  }

  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  public get token1Price(): Price {
    return new Price({
      baseCurrency: this.token1,
      quoteCurrency: this.token0,
      denominator: this.tokenAmounts[1].raw,
      numerator: this.tokenAmounts[0].raw,
    })
  }

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  public priceOf(token: Token): Price {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.token0Price : this.token1Price
  }

  /**
   * Returns the chain ID of the tokens in the pair.
   */
  public get chainId(): ChainId {
    return this.token0.chainId
  }

  public get token0(): Token {
    return this.tokenAmounts[0].token
  }

  public get token1(): Token {
    return this.tokenAmounts[1].token
  }

  public get reserve0(): TokenAmount {
    return this.tokenAmounts[0]
  }

  public get reserve1(): TokenAmount {
    return this.tokenAmounts[1]
  }

  public reserveOf(token: Token): TokenAmount {
    invariant(this.involvesToken(token), 'TOKEN')
    return token.equals(this.token0) ? this.reserve0 : this.reserve1
  }

  public getOutputAmount(inputAmount: TokenAmount): [TokenAmount, Pair] {
    invariant(this.involvesToken(inputAmount.token), 'TOKEN')
    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError()
    }
    const inputReserve = this.reserveOf(inputAmount.token)
    const outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0)
    const inputAmountWithFee = JSBI.multiply(inputAmount.raw, JSBI.subtract(_10000, parseBigintIsh(this.swapFee)))
    const numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw)
    const denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _10000), inputAmountWithFee)
    const outputAmount = new TokenAmount(
      inputAmount.token.equals(this.token0) ? this.token1 : this.token0,
      JSBI.divide(numerator, denominator),
    )
    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return [
      outputAmount,
      new Pair(
        inputReserve.add(inputAmount),
        outputReserve.subtract(outputAmount),
        this.swapFee,
        this.protocolFeeDenominator,
        this.platform,
        this.liquidityMiningCampaigns,
      ),
    ]
  }

  public getInputAmount(outputAmount: TokenAmount): [TokenAmount, Pair] {
    invariant(this.involvesToken(outputAmount.token), 'TOKEN')
    if (
      JSBI.equal(this.reserve0.raw, ZERO) ||
      JSBI.equal(this.reserve1.raw, ZERO) ||
      JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)
    ) {
      throw new InsufficientReservesError()
    }

    const outputReserve = this.reserveOf(outputAmount.token)
    const inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0)
    const numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _10000)
    const denominator = JSBI.multiply(
      JSBI.subtract(outputReserve.raw, outputAmount.raw),
      JSBI.subtract(_10000, parseBigintIsh(this.swapFee)),
    )
    const inputAmount = new TokenAmount(
      outputAmount.token.equals(this.token0) ? this.token1 : this.token0,
      JSBI.add(JSBI.divide(numerator, denominator), ONE),
    )
    return [
      inputAmount,
      new Pair(
        inputReserve.add(inputAmount),
        outputReserve.subtract(outputAmount),
        this.swapFee,
        this.protocolFeeDenominator,
        this.platform,
        this.liquidityMiningCampaigns,
      ),
    ]
  }

  public getLiquidityMinted(
    totalSupply: TokenAmount,
    tokenAmountA: TokenAmount,
    tokenAmountB: TokenAmount,
  ): TokenAmount {
    invariant(totalSupply.token.equals(this.liquidityToken), 'LIQUIDITY')
    const tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
      ? [tokenAmountA, tokenAmountB]
      : [tokenAmountB, tokenAmountA]
    invariant(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1), 'TOKEN')

    let liquidity: JSBI
    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY)
    } else {
      const amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw)
      const amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw)
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1
    }
    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError()
    }
    return new TokenAmount(this.liquidityToken, liquidity)
  }

  public getLiquidityValue(
    token: Token,
    totalSupply: TokenAmount,
    liquidity: TokenAmount,
    feeOn = false,
    kLast?: BigintIsh,
  ): TokenAmount {
    invariant(this.involvesToken(token), 'TOKEN')
    invariant(totalSupply.token.equals(this.liquidityToken), 'TOTAL_SUPPLY')
    invariant(liquidity.token.equals(this.liquidityToken), 'LIQUIDITY')
    invariant(JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw), 'LIQUIDITY')

    let totalSupplyAdjusted: TokenAmount
    if (!feeOn) {
      totalSupplyAdjusted = totalSupply
    } else {
      invariant(!!kLast, 'K_LAST')
      const kLastParsed = parseBigintIsh(kLast)
      if (!JSBI.equal(kLastParsed, ZERO)) {
        const rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw))
        const rootKLast = sqrt(kLastParsed)
        if (JSBI.greaterThan(rootK, rootKLast)) {
          const numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast))
          const denominator = JSBI.add(JSBI.multiply(rootK, parseBigintIsh(this.protocolFeeDenominator)), rootKLast)
          const feeLiquidity = JSBI.divide(numerator, denominator)
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity))
        } else {
          totalSupplyAdjusted = totalSupply
        }
      } else {
        totalSupplyAdjusted = totalSupply
      }
    }

    return new TokenAmount(
      token,
      JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw),
    )
  }
}
