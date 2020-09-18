import { AbstractConnectorArguments, ConnectorUpdate } from '@hmy-react/types'
import { AbstractConnector } from '@hmy-react/abstract-connector'
import warning from 'tiny-warning'

import { SendReturnResult, SendReturn, Send, SendOld } from './types'

function parseSendReturn(sendReturn: SendReturnResult | SendReturn): any {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}

export class NoHarmonyProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No Harmony provider was found on window.harmony.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class InjectedConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments) {
    super(kwargs)

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  private handleChainChanged(chainId: string | number): void {
    if (__DEV__) {
      console.log("Handling 'chainChanged' event with payload", chainId)
    }
    this.emitUpdate({ chainId, provider: window.harmony })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (__DEV__) {
      console.log("Handling 'accountsChanged' event with payload", accounts)
    }
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleClose(code: number, reason: string): void {
    if (__DEV__) {
      console.log("Handling 'close' event with payload", code, reason)
    }
    this.emitDeactivate()
  }

  private handleNetworkChanged(networkId: string | number): void {
    if (__DEV__) {
      console.log("Handling 'networkChanged' event with payload", networkId)
    }
    this.emitUpdate({ chainId: networkId, provider: window.harmony })
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!window.harmony) {
      throw new NoHarmonyProviderError()
    }

    if (window.harmony.on) {
      window.harmony.on('chainChanged', this.handleChainChanged)
      window.harmony.on('accountsChanged', this.handleAccountsChanged)
      window.harmony.on('close', this.handleClose)
      window.harmony.on('networkChanged', this.handleNetworkChanged)
    }

    if ((window.harmony as any).isMetaMask) {
      ;(window.harmony as any).autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via hmyv2_requestAccounts
    let account
    try {
      account = await (window.harmony.send as Send)('hmyv2_requestAccounts').then(
        sendReturn => parseSendReturn(sendReturn)[0]
      )
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'hmyv2_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await window.harmony.enable().then(sendReturn => sendReturn && parseSendReturn(sendReturn)[0])
    }

    return { provider: window.harmony, ...(account ? { account } : {}) }
  }

  public async getProvider(): Promise<any> {
    return window.harmony
  }

  public async getChainId(): Promise<number | string> {
    if (!window.harmony) {
      throw new NoHarmonyProviderError()
    }

    let chainId
    try {
      chainId = await (window.harmony.send as Send)('hmyv2_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'hmyv2_chainId was unsuccessful, falling back to net_version')
    }

    if (!chainId) {
      try {
        chainId = await (window.harmony.send as Send)('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }

    if (!chainId) {
      try {
        chainId = parseSendReturn((window.harmony.send as SendOld)({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }

    if (!chainId) {
      if ((window.harmony as any).isDapper) {
        chainId = parseSendReturn((window.harmony as any).cachedResults.net_version)
      } else {
        chainId =
          (window.harmony as any).chainId ||
          (window.harmony as any).netVersion ||
          (window.harmony as any).networkVersion ||
          (window.harmony as any)._chainId
      }
    }

    return chainId
  }

  public async getAccount(): Promise<null | string> {
    if (!window.harmony) {
      throw new NoHarmonyProviderError()
    }

    let account
    try {
      account = await (window.harmony.send as Send)('hmyv2_accounts').then(sendReturn => parseSendReturn(sendReturn)[0])
    } catch {
      warning(false, 'hmyv2_accounts was unsuccessful, falling back to enable')
    }

    if (!account) {
      try {
        account = await window.harmony.enable().then(sendReturn => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to hmyv2_accounts v2')
      }
    }

    if (!account) {
      account = parseSendReturn((window.harmony.send as SendOld)({ method: 'hmyv2_accounts' }))[0]
    }

    return account
  }

  public deactivate() {
    if (window.harmony && window.harmony.removeListener) {
      window.harmony.removeListener('chainChanged', this.handleChainChanged)
      window.harmony.removeListener('accountsChanged', this.handleAccountsChanged)
      window.harmony.removeListener('close', this.handleClose)
      window.harmony.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }

  public async isAuthorized(): Promise<boolean> {
    if (!window.harmony) {
      return false
    }

    try {
      return await (window.harmony.send as Send)('hmyv2_accounts').then(sendReturn => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true
        } else {
          return false
        }
      })
    } catch {
      return false
    }
  }
}
