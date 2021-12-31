import { ChainId } from '../../../constants'
import { CURVE_3POOL_ABI, CURVE_CRYPTO_SWAP_ABI, CURVE_ROUTER_ABI } from './abi'

export interface CurveToken {
  isLPToken?: boolean
  address: string
  symbol: string
  name: string
  decimals: number
}

export interface CurvePool {
  name: string
  swapAddress: string
  abi: string
  approveAddress: string
  tokens: CurveToken[]
  isMeta: boolean
}

/**
 * CurveFi Router address for each Supported ChainId
 *
 */
export const ROUTER_ADDRESS: Record<ChainId, string> = {
  [ChainId.MAINNET]: '',
  [ChainId.ARBITRUM_ONE]: '',
  [ChainId.ARBITRUM_RINKEBY]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.XDAI]: ''
}

export const BTC_COINS = {
  sbtccrv: '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3', // sbtcCRV
  hbtc: '0x0316EB71485b0Ab14103307bf65a021042c6d380', // HBTC
  renbtc: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', // renBTC
  wbtc: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  tbtc: '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa', // TBTC
  pbtc: '0x5228a22e72ccC52d415EcFd199F99D0665E7733b', // pBTC
  bbtc: '0x9be89d2a4cd102d8fecc6bf9da793be995c22541', // bBTC
  obtc: '0x8064d9Ae6cDf087b1bcd5BDf3531bD5d8C537a68', // oBTC
  sbtc: '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6' // sBTC
}

export const ETH_COINS = {
  steth: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84', // stETH
  eth: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // ETH
  ankreth: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb', // ankrETH
  seth: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb', // sETH
  reth: '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593', // rETH
  weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
}

export const LINK_COINS = {
  link: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // LINK
  slink: '0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6' // sLINK
}

export const EUR_COINS = {
  eurs: '0xdB25f211AB05b1c97D595516F45794528a807ad8', // EURS
  seur: '0xD71eCFF9342A5Ced620049e616c5035F1dB98620' // sEUR
}

export const USD_COINS = {
  ycdai: '0x99d1Fa417f94dcD62BfE781a1213c092a47041Bc', // pax/yDAI
  ycusdc: '0x9777d7E2b60bB01759D0E2f8be2095df444cb07E', // pax/yUSDC
  ycusdt: '0x1bE5d71F2dA660BFdee8012dDc58D024448A0A59', // pax/yUSDT
  pax: '0x8E870D67F660D95d5be530380D0eC0bd388289E1', // PAX

  adai: '0x028171bCA77440897B824Ca71D1c56caC55b68A3', // aDAI
  ausdc: '0xBcca60bB61934080951369a648Fb03DF4F96263C', // aUSDC
  ausdt: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811', // aUSDT
  asusd: '0x6c5024cd4f8a59110119c56f8933403a539555eb', // aSUSD

  cdai: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', // cDAI
  cusdc: '0x39AA39c021dfbaE8faC545936693aC917d5E7563', // cUSDC
  cydai: '0x8e595470ed749b85c6f7669de83eae304c2ec68f', // cyDAI
  cyusdc: '0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c', // cyUSDC
  cyusdt: '0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a', // cyUSDT

  bydai: '0xC2cB1040220768554cf699b0d863A3cd4324ce32', // busd/yDAI
  byusdc: '0x26EA744E5B887E5205727f55dFBE8685e3b21951', // busd/yUSDC
  byusdt: '0xE6354ed5bC4b393a5Aad09f21c46E101e692d447', // busd/yUSDT
  ybusd: '0x04bC0Ab673d88aE9dbC9DA2380cB6B79C4BCa9aE', // yBUSD
  ydai: '0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01', // y/yDAI
  yusdc: '0xd6aD7a6750A7593E092a9B218d66C0A814a3436e', // y/yUSDC
  yusdt: '0x83f798e925BcD4017Eb265844FDDAbb448f1707D', // y/yUSDT
  ytusd: '0x73a052500105205d34Daf004eAb301916DA8190f', // yTUSD

  gusd: '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd', // GUSD
  husd: '0xdF574c24545E5FfEcb9a659c229253D4111d87e1', // HUSD
  usdk: '0x1c48f86ae57291F7686349F12601910BD8D470bb', // USDK
  musd: '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5', // MUSD
  rsv: '0x196f4727526eA7FB1e17b2071B3d8eAA38486988', // RSV
  dusd: '0x5BC25f649fc4e26069dDF4cF4010F9f706c23831', // DUSD
  ust: '0xa47c8bf37f92abed4a126bda807a7b7498661acd', // UST
  usdp: '0x1456688345527bE1f37E9e627DA0837D6f08C925', // USDP

  usdn: '0x674C6Ad92Fd080e4004b2312b45f796a192D27a0', // USDN

  dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
  usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
  usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
  susd: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51', // sUSD

  tusd: '0x0000000000085d4780B73119b644AE5ecd22b376', // TUSD
  frax: '0x853d955acef822db058eb8505911ed77f175b99e', // FRAX
  lusd: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0', // LUSD
  busd: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', // BUSD
  alusd: '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9', // alUSD
  mim: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3', // MIM

  '3crv': '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490', // 3CRV
  crv: '0xD533a949740bb3306d119CC777fa900bA034cd52' // CRV
}

export type CurveCoinList = Record<
  | keyof typeof BTC_COINS
  | keyof typeof ETH_COINS
  | keyof typeof LINK_COINS
  | keyof typeof EUR_COINS
  | keyof typeof USD_COINS
  | 'snx',
  string
>

// Mainnet
export const COINS_MAINNET = {
  ...BTC_COINS,
  ...ETH_COINS,
  ...LINK_COINS,
  ...EUR_COINS,
  ...USD_COINS,
  snx: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f' // SNX
} as CurveCoinList

/**
 * xDAI Chain coins
 */
export const TOKENS_XDAI: Record<string, CurveToken> = {
  wxdai: {
    symbol: 'WXDAI',
    name: 'WXDAI',
    address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    decimals: 18
  },
  usdc: {
    symbol: 'USDC',
    name: 'USDC',
    address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    decimals: 6
  },
  usdt: {
    symbol: 'USDT',
    name: 'USDT',
    address: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
    decimals: 6
  }
}

/**
 * xDAI pools
 */
export const POOLS_XDAI: CurvePool[] = [
  {
    name: '3pool',
    abi: CURVE_3POOL_ABI,
    swapAddress: '0x7f90122BF0700F9E7e1F688fe926940E8839F353',
    approveAddress: '0x7f90122BF0700F9E7e1F688fe926940E8839F353',
    isMeta: false,
    // Order is crucial
    tokens: [TOKENS_XDAI.wxdai, TOKENS_XDAI.usdc, TOKENS_XDAI.usdt]
  }
]

/**
 * Arbitrum Coins
 */
export const TOKENS_ARBITRUM_ONE: { [k: string]: CurveToken } = {
  usdc: {
    symbol: 'USDC',
    name: 'USDC',
    decimals: 6,
    address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
  },
  usdt: {
    symbol: 'USDT',
    name: 'USDT',
    decimals: 6,
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
  },
  wbtc: {
    symbol: 'wBTC',
    name: 'wBTC',
    decimals: 8,
    address: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
  },
  renbtc: {
    symbol: 'renBTC',
    name: 'renBTC',
    decimals: 8,
    address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501'
  },
  eth: {
    symbol: 'ETH',
    name: 'ETH',
    decimals: 18,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  },
  weth: {
    symbol: 'WETH',
    name: 'WETH',
    decimals: 18,
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
  },
  eurs: {
    symbol: 'EURs',
    name: 'EURs',
    decimals: 2,
    address: '0xD22a58f79e9481D1a88e00c343885A588b34b68B'
  }
}

export const POOLS_ARBITRUM_ONE: CurvePool[] = [
  {
    name: '2pool',
    swapAddress: '0x7f90122bf0700f9e7e1f688fe926940e8839f353',
    approveAddress: '0x7f90122bf0700f9e7e1f688fe926940e8839f353',
    abi: CURVE_3POOL_ABI,
    isMeta: false,
    tokens: [TOKENS_ARBITRUM_ONE.usdc, TOKENS_ARBITRUM_ONE.usdt]
    // underlyingTokens: [TOKENS_ARBITRUM_ONE.usdc, TOKENS_ARBITRUM_ONE.usdt],
  },
  {
    name: 'tricrypto',
    abi: CURVE_ROUTER_ABI,
    isMeta: false,
    swapAddress: '0x960ea3e3C7FB317332d990873d354E18d7645590',
    approveAddress: '0x960ea3e3C7FB317332d990873d354E18d7645590',
    tokens: [TOKENS_ARBITRUM_ONE.usdt, TOKENS_ARBITRUM_ONE.wbtc, TOKENS_ARBITRUM_ONE.weth]
  },
  {
    name: 'ren',
    swapAddress: '0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb',
    abi: CURVE_3POOL_ABI,
    isMeta: false,
    approveAddress: '0x3E01dD8a5E1fb3481F0F589056b428Fc308AF0Fb',
    tokens: [TOKENS_ARBITRUM_ONE.wbtc, TOKENS_ARBITRUM_ONE.renbtc]
  },
  {
    name: 'eursusd',
    swapAddress: '0x25e2e8d104bc1a70492e2be32da7c1f8367f9d2c',
    approveAddress: '0x25e2e8d104bc1a70492e2be32da7c1f8367f9d2c',
    abi: CURVE_CRYPTO_SWAP_ABI,
    isMeta: true,
    tokens: [
      TOKENS_ARBITRUM_ONE.eurs, // USDC
      TOKENS_ARBITRUM_ONE.usdc, // USDC
      TOKENS_ARBITRUM_ONE.usdt // USDT
    ]
  }
]

/**
 * @todo DRY up
 */
export const DECIMALS: { [index: string]: number } = {
  '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3': 18, // sbtcCRV
  '0x0316EB71485b0Ab14103307bf65a021042c6d380': 18, // HBTC
  '0x99d1Fa417f94dcD62BfE781a1213c092a47041Bc': 18, // pax/yDAI
  '0x9777d7E2b60bB01759D0E2f8be2095df444cb07E': 6, // pax/yUSDC
  '0x1bE5d71F2dA660BFdee8012dDc58D024448A0A59': 6, // pax/yUSDT
  '0x8E870D67F660D95d5be530380D0eC0bd388289E1': 18, // PAX
  '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D': 8, // renBTC
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': 8, // WBTC
  '0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa': 18, // TBTC
  '0x5228a22e72ccC52d415EcFd199F99D0665E7733b': 18, // pBTC
  '0x9be89d2a4cd102d8fecc6bf9da793be995c22541': 8, // bBTC
  '0x8064d9Ae6cDf087b1bcd5BDf3531bD5d8C537a68': 18, // oBTC
  '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6': 18, // sBTC

  '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84': 18, // stETH
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': 18, // ETH
  '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb': 18, // ankrETH
  '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb': 18, // sETH
  '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593': 18, // rETH
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': 18, // WETH

  '0xdB25f211AB05b1c97D595516F45794528a807ad8': 2, // EURS
  '0xD71eCFF9342A5Ced620049e616c5035F1dB98620': 18, // sEUR

  '0x514910771AF9Ca656af840dff83E8264EcF986CA': 18, // LINK
  '0xbBC455cb4F1B9e4bFC4B73970d360c8f032EfEE6': 18, // sLINK

  '0x028171bCA77440897B824Ca71D1c56caC55b68A3': 18, // aDAI
  '0xBcca60bB61934080951369a648Fb03DF4F96263C': 6, // aUSDC
  '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811': 6, // aUSDT
  '0x6c5024cd4f8a59110119c56f8933403a539555eb': 18, // aSUSD

  '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643': 8, // cDAI
  '0x39AA39c021dfbaE8faC545936693aC917d5E7563': 8, // cUSDC
  '0x8e595470ed749b85c6f7669de83eae304c2ec68f': 8, // cyDAI
  '0x76eb2fe28b36b3ee97f3adae0c69606eedb2a37c': 8, // cyUSDC
  '0x48759f220ed983db51fa7a8c0d2aab8f3ce4166a': 8, // cyUSDT

  '0xC2cB1040220768554cf699b0d863A3cd4324ce32': 18, // busd/yDAI
  '0x26EA744E5B887E5205727f55dFBE8685e3b21951': 6, // busd/yUSDC
  '0xE6354ed5bC4b393a5Aad09f21c46E101e692d447': 6, // busd/yUSDT
  '0x04bC0Ab673d88aE9dbC9DA2380cB6B79C4BCa9aE': 18, // yBUSD
  '0x16de59092dAE5CcF4A1E6439D611fd0653f0Bd01': 18, // y/yDAI
  '0xd6aD7a6750A7593E092a9B218d66C0A814a3436e': 6, // y/yUSDC
  '0x83f798e925BcD4017Eb265844FDDAbb448f1707D': 6, // y/yUSDT
  '0x73a052500105205d34Daf004eAb301916DA8190f': 18, // yTUSD

  '0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd': 2, // GUSD
  '0xdF574c24545E5FfEcb9a659c229253D4111d87e1': 8, // HUSD
  '0x1c48f86ae57291F7686349F12601910BD8D470bb': 18, // USDK
  '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5': 18, // MUSD
  '0x196f4727526eA7FB1e17b2071B3d8eAA38486988': 18, // RSV
  '0x5BC25f649fc4e26069dDF4cF4010F9f706c23831': 18, // DUSD
  '0xa47c8bf37f92abed4a126bda807a7b7498661acd': 18, // UST
  '0x1456688345527bE1f37E9e627DA0837D6f08C925': 18, // USDP

  '0x674C6Ad92Fd080e4004b2312b45f796a192D27a0': 18, // USDN

  '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f': 18, // SNX

  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 18, // DAI
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 6, // USDC
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': 6, // USDT
  '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51': 18, // sUSD

  '0x0000000000085d4780B73119b644AE5ecd22b376': 18, // TUSD
  '0x853d955acef822db058eb8505911ed77f175b99e': 18, // FRAX
  '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0': 18, // LUSD
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53': 18, // BUSD
  '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9': 18, // alUSD
  '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3': 18, // MIM

  '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490': 18, // 3CRV
  '0xD533a949740bb3306d119CC777fa900bA034cd52': 18 // CRV,
}

export const CURVE_POOLS: { [chainId in ChainId]: CurvePool[] } = {
  [ChainId.MAINNET]: [],
  [ChainId.XDAI]: POOLS_XDAI,
  [ChainId.ARBITRUM_ONE]: POOLS_ARBITRUM_ONE,
  // Empty
  [ChainId.RINKEBY]: [],
  [ChainId.ARBITRUM_RINKEBY]: []
}
