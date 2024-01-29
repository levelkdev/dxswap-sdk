"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiVersion = exports.SWAP_BASE_URL = void 0;
const constants_1 = require("./constants");
exports.SWAP_BASE_URL = 'https://production.sushi.com/swap';
const getApiVersion = (chainId) => {
    if ((0, constants_1.isRouteProcessor3_2ChainId)(chainId)) {
        return '/v3.2';
    }
    if ((0, constants_1.isRouteProcessor3_1ChainId)(chainId)) {
        return '/v3.1';
    }
    return '';
};
exports.getApiVersion = getApiVersion;
// const tradeApi = async (
//   chainId: ChainId,
//   fromToken: string,
//   toToken: string,
//   amount: string,
//   slippagePercentage: string,
//   gasPrice: string,
//   recipient: string
// ) => {
//   const params = new URL(SWAP_BASE_URL + getApiVersion(chainId))
//   params.searchParams.set('chainId', `${chainId}`)
//   params.searchParams.set(
//     'tokenIn',
//     `${fromToken?.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : fromToken?.wrapped.address}`
//   )
//   params.searchParams.set(
//     'tokenOut',
//     `${toToken?.isNative ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' : toToken?.wrapped.address}`
//   )
//   params.searchParams.set('amount', `${amount?.quotient.toString()}`)
//   params.searchParams.set('maxPriceImpact', `${+slippagePercentage / 100}`)
//   params.searchParams.set('gasPrice', `${gasPrice}`)
//   params.searchParams.set('to', `${recipient}`)
//   params.searchParams.set('preferSushi', 'true')
//   source !== undefined && params.searchParams.set('source', `${source}`)
//   const res = await fetch(params.toString())
//   // const json = deserialize(await res.json()) should cause react query error
//   const json = await res.json()
//   try {
//     // CC
//     return tradeValidator01.parse(json)
//   } catch (e) {
//     console.error('tradeValidator01 error', e)
//     try {
//       // Try  API 2.0
//       if (fromToken && toToken) {
//         const resp2 = tradeValidator02.parse(json)
//         const resp1 = apiAdapter02To01(resp2, fromToken, toToken, recipient)
//         return resp1
//       }
//     } catch (_e) {
//       console.error('tradeValidator02 error', _e)
//     }
//     throw e
//   }
// }
//# sourceMappingURL=api.js.map