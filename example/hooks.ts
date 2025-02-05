import { useState, useEffect } from 'react'
import { useHmyReact } from '@hmy-react/core'

import { injected } from './connectors'

export function useEagerConnect() {
  const { activate, active } = useHmyReact()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress: boolean = false) {
  const { active, error, activate } = useHmyReact()

  useEffect((): any => {
    const { harmony } = window as any
    if (harmony && harmony.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        activate(injected)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        activate(injected)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(injected)
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        activate(injected)
      }

      harmony.on('connect', handleConnect)
      harmony.on('chainChanged', handleChainChanged)
      harmony.on('accountsChanged', handleAccountsChanged)
      harmony.on('networkChanged', handleNetworkChanged)

      return () => {
        if (harmony.removeListener) {
          harmony.removeListener('connect', handleConnect)
          harmony.removeListener('chainChanged', handleChainChanged)
          harmony.removeListener('accountsChanged', handleAccountsChanged)
          harmony.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}
