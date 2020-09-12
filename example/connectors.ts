import { InjectedConnector } from '@hmy-react/injected-connector'
import { NetworkConnector } from '@hmy-react/network-connector'
import { LedgerConnector } from '@hmy-react/ledger-connector'
import { FortmaticConnector } from '@hmy-react/fortmatic-connect'

const POLLING_INTERVAL = 12000
const RPC_URLS: { [chainId: number]: string } = {
  1: process.env.RPC_MAINNET as string,
  2: process.env.RPC_TESTNET as string
}

export const injected = new InjectedConnector({ supportedChainIds: [1, 2] })

export const network = new NetworkConnector({
  urls: { 1: RPC_URLS[1], 2: RPC_URLS[4] },
  defaultChainId: 1
})

export const ledger = new LedgerConnector({ chainId: 1, url: RPC_URLS[1], pollingInterval: POLLING_INTERVAL })

export const fortmatic = new FortmaticConnector({ apiKey: process.env.FORTMATIC_API_KEY as string, chainId: 2 })
