# `hmy-react` Documentation - Injected

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)
- [Errors](#errors)
  - [NoHarmonyProviderError](#noharmonyprovidererror)
    - [Example](#example-1)
  - [UserRejectedRequestError](#userrejectedrequesterror)
    - [Example](#example-2)

## Install
`yarn add @hmy-react/injected-connector`

## Arguments
```typescript
supportedChainIds?: number[]
```

## Example
```javascript
import { InjectedConnector } from '@hmy-react/injected-connector'

const injected = new InjectedConnector({ supportedChainIds: [1, 2] })
```

## Errors

### NoHarmonyProviderError

#### Example
```javascript
import { NoHarmonyProviderError } from '@hmy-react/injected-connector'

function Component () {
  const { error } = useHmyReact()
  const isNoHarmonyProviderError = error instanceof NoHarmonyProviderError
  // ...
}
```

### UserRejectedRequestError

#### Example
```javascript
import { UserRejectedRequestError } from '@hmy-react/injected-connector'

function Component () {
  const { error } = useHmyReact()
  const isUserRejectedRequestError = error instanceof UserRejectedRequestError
  // ...
}
```
