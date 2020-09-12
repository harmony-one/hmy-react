# `hmy-react` Documentation - Fortmatic

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)

## Install
`yarn add @hmy-react/fortmatic-connector`

## Arguments
```typescript
apiKey: string
chainId: number
```

## Example
```javascript
import { FortmaticConnector } from '@hmy-react/fortmatic-connector'

const fortmatic = new FortmaticConnector({ apiKey: '...', chainId: 4 })
```

Note: Once the connector has been activated, the Fortmatic SDK instance can be accessed under the `.fortmatic` property.
