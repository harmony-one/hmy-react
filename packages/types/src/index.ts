export interface AbstractConnectorArguments {
  supportedChainIds?: number[]
}

export interface ConnectorUpdate<T = number | string> {
  provider?: any
  chainId?: T
  account?: null | string
}

export enum ConnectorEvent {
  Update = 'HmyReactUpdate',
  Error = 'HmyReactError',
  Deactivate = 'HmyReactDeactivate'
}
