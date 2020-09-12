import React, { createContext, useContext, useMemo } from 'react'
import invariant from 'tiny-invariant'

import { HmyReactContextInterface } from './types'
import { useHmyReactManager } from './manager'

export const PRIMARY_KEY = 'primary'
const CONTEXTS: { [key: string]: React.Context<HmyReactContextInterface> } = {}

interface HmyReactProviderArguments {
  getLibrary: (provider?: any, connector?: Required<HmyReactContextInterface>['connector']) => any
  children: any
}

export function createHmyReactRoot(key: string): (args: HmyReactProviderArguments) => JSX.Element {
  invariant(!CONTEXTS[key], `A root already exists for provided key ${key}`)

  CONTEXTS[key] = createContext<HmyReactContextInterface>({
    activate: async () => {
      invariant(false, 'No <HmyReactProvider ... /> found.')
    },
    setError: () => {
      invariant(false, 'No <HmyReactProvider ... /> found.')
    },
    deactivate: () => {
      invariant(false, 'No <HmyReactProvider ... /> found.')
    },
    active: false
  })
  CONTEXTS[key].displayName = `HmyReactContext - ${key}`

  const Provider = CONTEXTS[key].Provider

  return function HmyReactProvider({ getLibrary, children }: HmyReactProviderArguments): JSX.Element {
    const {
      connector,
      provider,
      chainId,
      account,

      activate,
      setError,
      deactivate,

      error
    } = useHmyReactManager()

    const active = connector !== undefined && chainId !== undefined && account !== undefined && !!!error
    const library = useMemo(
      () =>
        active && chainId !== undefined && Number.isInteger(chainId) && !!connector
          ? getLibrary(provider, connector)
          : undefined,
      [active, getLibrary, provider, connector, chainId]
    )

    const hmyReactContext: HmyReactContextInterface = {
      connector,
      library,
      chainId,
      account,

      activate,
      setError,
      deactivate,

      active,
      error
    }

    return <Provider value={hmyReactContext}>{children}</Provider>
  }
}

export const HmyReactProvider = createHmyReactRoot(PRIMARY_KEY)

export function getHmyReactContext<T = any>(key: string = PRIMARY_KEY): React.Context<HmyReactContextInterface<T>> {
  invariant(Object.keys(CONTEXTS).includes(key), `Invalid key ${key}`)
  return CONTEXTS[key]
}

export function useHmyReact<T = any>(key?: string): HmyReactContextInterface<T> {
  return useContext(getHmyReactContext(key))
}
