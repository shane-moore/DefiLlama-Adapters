let coreAssets = require('./coreAssets.json')
const ADDRESSES = coreAssets
const nullAddress = ADDRESSES.null

coreAssets = JSON.parse(JSON.stringify(coreAssets))

// Multichain bridge info: https://bridgeapi.anyswap.exchange/v2/serverInfo/all
// IBC info - https://github.com/PulsarDefi/IBC-Cosmos/blob/main/ibc_data.json
// O3swap - https://agg.o3swap.com/v1/tokens_all
// wanchain - https://wanscan.org/tokens
// chainge - https://openapi.chainge.finance/open/v1/base/getSupportTokens,https://openapi.chainge.finance/open/v1/base/getSupportChains
// TODO: get celer info
// Alexar info: https://api.axelarscan.io/cross-chain/tvl
// coingecko coins: https://api.coingecko.com/api/v3/coins/list?include_platform=true
// gravity bridge for IBC: https://api.mintscan.io/v2/assets/gravity-bridge
// carbon: https://api-insights.carbon.network/info/denom_gecko_map
// orbit brige: https://bridge.orbitchain.io/open/v1/api/monitor/rawTokenList

const ibcChains = ['ibc', 'terra', 'terra2', 'crescent', 'osmosis', 'kujira', 'stargaze', 'juno', 'injective', 'cosmos', 'comdex', 'umee', 'orai', 'persistence', 'fxcore', 'neutron', 'quasar', 'chihuahua', 'sei', 'archway', 'migaloo', 'secret', 'aura', 'xpla', 'bostrom']
const caseSensitiveChains = [...ibcChains, 'solana', 'tezos', 'ton', 'algorand', 'aptos', 'near', 'bitcoin', 'waves', 'tron', 'litecoin', 'polkadot', 'ripple', 'elrond', 'cardano', 'stacks', 'sui', 'ergo', 'mvc', 'renec',]

const transformTokens = {
  // Sample Code
  // cronos: {
  //   "0x065de42e28e42d90c2052a1b49e7f83806af0e1f": "0x123", // CRK token is mispriced
  //   [ADDRESSES.cronos.TUSD]: ADDRESSES.ethereum.TUSD,
  // },

}
const ibcMappings = {
  // Sample Code
  // 'ibc/CA1261224952DF089EFD363D8DBB30A8AB6D8CD181E60EE9E68E432F8DE14FE3': { coingeckoId: 'inter-stable-token', decimals: 6, },
  // 'ibc/5A76568E079A31FA12165E4559BA9F1E9D4C97F9C2060B538C84DCD503815E30': { coingeckoId: 'injective-protocol', decimals: 18, },
}

const fixBalancesTokens = {
  zklink: {
    [ADDRESSES.zklink.WETH]: { coingeckoId: "ethereum", decimals: 18 },
  },
  waves: {
    'WAVES':  { coingeckoId: 'waves', decimals: 8 },
    'YiNbofFzC17jEHHCMwrRcpy9MrrjabMMLZxg8g5xmf7':  { coingeckoId: 'waves', decimals: 8 },
    '3VuV5WTmDz47Dmdn3QpcYjzbSdipjQE4JMdNe1xZpX13': { coingeckoId: 'ethereum', decimals: 8 },
    '2Fge5HEBRD3XTeg7Xg3FW5yiB9HVJFQtMXiWMQo72Up6': { coingeckoId: 'wrapped-bitcoin', decimals: 8 },
    '66a1br3BrkoaJgP7yEar9hJcSTvJPoH6PYBLqscXcMGo': { coingeckoId: 'binancecoin', decimals: 8 }, 
    'QGDb5VHmjUMfHPAvRJ4g36nmU5qYByYyYzReJN71nad': { coingeckoId: 'chainlink', decimals: 8 }, 
    '2x8CpnEDNw2nsuyvEptEmEbVrkxh9regRDNrqTWThJTZ': { coingeckoId: 'maker', decimals: 8 }, 
    '78ePJGDo2H6cZUDYsAMzqxe2iSRNgz4QBnYYg58ZxdgH': { coingeckoId: 'uniswap', decimals: 8 }, 
    'AhGJvjtYmRG2pKwXvTh8N6sX1M2wNTpkjxaWKQfzJe7q': { coingeckoId: 'matic-network', decimals: 8 }, 
    'EW1uGLVo21Wd9i2Rhq8o4VKDTCQTGCGXE8DqayHGrLg8': { coingeckoId: 'binance-bitcoin', decimals: 8 }, 
    'FmsB2B21fVVetWvZm7Q48cC2Bvs2hEZtft49TBn3guV1': { coingeckoId: 'curve-dao-token', decimals: 8 }, 
    '5Ga8eJdR5PoBWLC2xaq6F6PAGCM5hWVNhuyycgsNn4jR': { coingeckoId: 'crvusd', decimals: 6 }, 
    'Fwvk46RZ4iBg4L9GzwjQ7jwVsEScn4aPD32V6wftTLHQ': { coingeckoId: 'tron', decimals: 6 }, 
  
    'G5WWWzzVsWRyzGf32xojbnfp7gXbWrgqJT8RcVWEfLmC': { coingeckoId: 'tether', decimals: 6, name: 'USDT-PPT' },
    '9wc3LXNA4TEBsXyKtoLE9mrbDD7WMHXvXrCjZvabLAsi': { coingeckoId: 'tether', decimals: 6, name: 'USDT-ERC20' },
    'A81p1LTRyoq2rDR2TNxB2dWYxsiNwCSSi8sXef2SEkwb': { coingeckoId: 'tether', decimals: 6, name: 'USDT-BEP20' },
    'DaErMEp76HtuvbbSYxDwLovRimaAwtEyQGFeHLQ3UWwh': { coingeckoId: 'tether', decimals: 6, name: 'USDT-TRC20' },
    'Cu6FRaNphvp1iwmnyVRAvcnyVgLEwBGwSvGQrVsThAAD': { coingeckoId: 'tether', decimals: 6, name: 'USDT-POLY' },
  
    '3ayH3PhWMkhFsySsUVcC8BvFf1QyxGB5BZuTPyVtmP4v': { coingeckoId: 'usd-coin', decimals: 6, name: 'USDC-PPT' }, 
    'HGgabTqUS8WtVFUJzfmrTDMgEccJuZLBPhFgQFxvnsoW': { coingeckoId: 'usd-coin', decimals: 6, name: 'USDC-ERC20' }, 
    '4BKKSp6NoNcrFHyorZogDyctq1fq6w7114Ym1pw6HUtC': { coingeckoId: 'usd-coin', decimals: 6, name: 'USDC-BEP20' }, 
    'EMGARezYjWYMvaU795eQK4jzrDZhCfdREAYXGb8UeDk1': { coingeckoId: 'usd-coin', decimals: 6, name: 'USDC-TRC20' }, 
    '791Q1EcmnUAwRBqck7SyPbowktToCTKARsmBju4XQKd2': { coingeckoId: 'usd-coin', decimals: 6, name: 'USDT-POLY' }, 
  
    'C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS': { coingeckoId: 'waves-ducks', decimals: 8 },
    'DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p': { coingeckoId: 'neutrino', decimals: 6 },
    'GAzAEjApmjMYZKPzri2g2VUXNvTiQGF7KDYZFFsP3AEq': { coingeckoId: 'pete', decimals: 8 },
    'Atqv59EYzjFGuitKVnMRk6H8FukjoV3ktPorbEys25on': { coingeckoId: 'waves-exchange', decimals: 8 },
    '2thsACuHmzDMuNezPM32wg9a3BwUzBWDeSKakgz3cw21': { coingeckoId: 'power-token', decimals: 8 },
    '4LHHvYGNKJUg5hj65aGD5vgScvCBmLpdRFtjokvCjSL8': { coingeckoId: 'waves-enterprise', decimals: 8 },
    '6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g': { coingeckoId: 'neutrino-system-base-token', decimals: 8 },
    'HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS': { coingeckoId: 'puzzle-swap', decimals: 8 },
    'Ehie5xYpeN8op1Cctc6aGUrqx8jq3jtf1DSjXDbfm7aT': { coingeckoId: 'swop', decimals: 8 },
  },
  // Sample Code
  ozone: {
    // '0x83048f0bf34feed8ced419455a4320a735a92e9d': { coingeckoId: "ozonechain", decimals: 18 }, // was mapped to wrong chain
  }
}

ibcChains.forEach(chain => fixBalancesTokens[chain] = { ...ibcMappings, ...(fixBalancesTokens[chain] || {}) })

function getUniqueAddresses(addresses, chain) {
  const toLowerCase = !caseSensitiveChains.includes(chain)
  const set = new Set()
  addresses.forEach(i => set.add(toLowerCase ? i.toLowerCase() : i))
  return [...set]
}

function normalizeMapping(mapping, chain) {
  if (caseSensitiveChains.includes(chain)) return;
  Object.keys(mapping).forEach(
    key => (mapping[key.toLowerCase()] = mapping[key])
  );
}

for (const [chain, mapping] of Object.entries(transformTokens))
  normalizeMapping(mapping, chain)

for (const [chain, mapping] of Object.entries(fixBalancesTokens))
  normalizeMapping(mapping, chain)

for (const [chain, mapping] of Object.entries(coreAssets))
  coreAssets[chain] = Object.values(mapping).map(i => stripTokenHeader(i, chain))

function getCoreAssets(chain = 'ethereum') {
  const tokens = [
    coreAssets[chain] || [],
    Object.keys(transformTokens[chain] || {}),
    Object.keys(fixBalancesTokens[chain] || {}),
  ].flat()
  let addresses = getUniqueAddresses(tokens, chain)
  if (ibcChains.includes(chain)) addresses.push(...coreAssets.ibc.map(i => 'ibc/' + i))
  if (anyswapTokenBlacklist[chain]) addresses = addresses.filter(i => !anyswapTokenBlacklist[chain].includes(i))
  return addresses
}

function normalizeAddress(address, chain, extractChain = false) {
  if (!chain && extractChain && address.includes(':')) chain = address.split(':')[0]
  if (caseSensitiveChains.includes(chain)) return address
  return address.toLowerCase()
}

function stripTokenHeader(token, chain) {
  if (chain === 'aptos') return token.replace(/^aptos:/, '')
  token = normalizeAddress(token, chain);
  if (chain && !token.startsWith(chain)) return token;
  return token.indexOf(":") > -1 ? token.split(":").slice(1).join(':') : token;
}

const eulerTokens = [
  "0x1b808f49add4b8c6b5117d9681cf7312fcf0dc1d",
  "0xe025e3ca2be02316033184551d4d3aa22024d9dc",
  "0xeb91861f8a4e1c12333f42dce8fb0ecdc28da716",
  "0x4d19f33948b99800b6113ff3e83bec9b537c85d2",
  "0x5484451a88a35cd0878a1be177435ca8a0e4054e",
  "0x64ad6d2472de5ddd3801fb4027c96c3ee7a7ee82",
  // 4626 wrapped eTokens
  "0x60897720aa966452e8706e74296b018990aec527",
  "0x3c66B18F67CA6C1A71F829E2F6a0c987f97462d0",
  "0x4169Df1B7820702f566cc10938DA51F6F597d264",
  "0xbd1bd5c956684f7eb79da40f582cbe1373a1d593",
]

const anyswapTokenBlacklist = {
  ethereum: [ADDRESSES.ethereum.FTM],
  fantom: [
    ADDRESSES.fantom.anyUSDC,
    ADDRESSES.fantom.fUSDT,
    ADDRESSES.fantom.USDC,
    ADDRESSES.fantom.fUSDT,
    ADDRESSES.fantom.DAI,
    ADDRESSES.fantom.MIM,
    ADDRESSES.fantom.nICE
  ],
  harmony: [ADDRESSES.harmony.AVAX],
  kcc: [
    ADDRESSES.moonriver.USDC,
    ADDRESSES.moonriver.ETH,
    ADDRESSES.kcc.DAI,
    ADDRESSES.kcc.WBTC
  ],
  moonriver: [
    ADDRESSES.moonriver.USDT,
    ADDRESSES.moonriver.USDC,
    ADDRESSES.moonriver.ETH
  ],
  arbitrum: [ADDRESSES.arbitrum.MIM],
  shiden: [
    ADDRESSES.telos.ETH,
    ADDRESSES.telos.USDC,
    ADDRESSES.shiden.JPYC,
    ADDRESSES.shiden.ETH,
    ADDRESSES.dogechain.BUSD,
    ADDRESSES.shiden.BUSD
  ],
  telos: [
    ADDRESSES.telos.ETH,
    ADDRESSES.telos.WBTC,
    ADDRESSES.telos.USDC,
    ADDRESSES.telos.USDT
  ],
  syscoin: [
    ADDRESSES.syscoin.USDC,
    ADDRESSES.syscoin.ETH,
    ADDRESSES.syscoin.USDT
  ],
  boba: [ADDRESSES.boba.BUSD],
  velas: [
    ADDRESSES.moonriver.ETH,
    ADDRESSES.moonriver.USDC
  ],
  dogechain: [
    ADDRESSES.moonriver.USDT,
    ADDRESSES.dogechain.BUSD,
    ADDRESSES.dogechain.MATIC
  ],
  kava: [
    ADDRESSES.telos.ETH,
    ADDRESSES.moonriver.USDT,
    ADDRESSES.telos.USDC,
    ADDRESSES.shiden.ETH,
    ADDRESSES.syscoin.ETH,
    ADDRESSES.moonriver.USDC,
    ADDRESSES.dogechain.BUSD
  ],
  step: [
    ADDRESSES.moonriver.USDC,
    ADDRESSES.telos.ETH,
    ADDRESSES.telos.USDC,
    ADDRESSES.telos.USDT
  ],
  godwoken_v1: [
    ADDRESSES.moonriver.USDC,
    ADDRESSES.shiden.ETH,
    ADDRESSES.telos.ETH,
    ADDRESSES.moonriver.USDT
  ],
  milkomeda_a1: [ADDRESSES.telos.ETH],
  wemix: [
    ADDRESSES.boba.BUSD,
    ADDRESSES.shiden.ETH,
    ADDRESSES.moonriver.USDC
  ],
  eos_evm: [
    ADDRESSES.syscoin.USDT,
    ADDRESSES.shiden.ETH,
    ADDRESSES.telos.ETH,
    ADDRESSES.telos.USDT
  ],
}

module.exports = {
  nullAddress,
  caseSensitiveChains,
  transformTokens,
  fixBalancesTokens,
  normalizeAddress,
  getCoreAssets,
  ibcChains,
  stripTokenHeader,
  getUniqueAddresses,
  eulerTokens,
}
