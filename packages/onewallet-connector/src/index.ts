import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'

const { HarmonyExtension } = require('@harmony-js/core')

const chainIdToNetwork: { [network: number]: string } = {
  1: 'mainnet',
  2: 'testnet'
}

interface OneWalletConnectorArguments {
  chainId: number
  config?: any
}

export class OneWalletConnector extends AbstractConnector {
  private readonly chainId: number
  private readonly config: any

  public oneWallet: any

  constructor({ chainId, config = {} }: OneWalletConnectorArguments) {
    super({ supportedChainIds: [chainId] })

    this.chainId = chainId
    this.config = config
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.oneWallet) {
      this.oneWallet = await new HarmonyExtension(window.onewallet)
      this.oneWallet.setProvider(config.endpoint)
    }

    const account = await this.oneWallet.login()
    this.oneWallet.account = account
    return { provider: this.oneWallet.provider }
  }

  public async getProvider(): Promise<any> {
    return this.oneWallet.provider
  }

  public async getChainId(): Promise<number | string> {
    return this.oneWallet.chainId
  }

  public async getAccount(): Promise<null | string> {
    return this.oneWallet.account
  }

  public deactivate() {}

  public async close() {
    this.oneWallet.logout()
    this.emitDeactivate()
  }
}
