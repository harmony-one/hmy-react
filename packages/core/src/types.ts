import { AbstractConnector } from '@hmy-react/abstract-connector'

export interface HmyReactManagerFunctions {
  activate: (connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean) => Promise<void>
  setError: (error: Error) => void
  deactivate: () => void
}

export interface HmyReactManagerReturn extends HmyReactManagerFunctions {
  connector?: AbstractConnector
  provider?: any
  chainId?: number
  account?: null | string

  error?: Error
}

export interface HmyReactContextInterface<T = any> extends HmyReactManagerFunctions {
  connector?: AbstractConnector
  library?: T
  chainId?: number
  account?: null | string

  active: boolean
  error?: Error
}
