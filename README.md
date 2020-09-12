# `hmy-react` 🧰

_A simple, maximally extensible, dependency minimized framework for building modern [Harmony dApps](https://docs.harmony.one/home/developers)_

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

| Packages                              | `@latest` Version                                                                                                                                                         | Size                                                                                                                                                                                 | Description                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 🏠 **Core**                           |
| `@hmy-react/core`                    | [![npm version](https://img.shields.io/npm/v/@hmy-react/core/latest.svg)](https://www.npmjs.com/package/@hmy-react/core/v/latest)                                       | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/core/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/core@latest)                                       | [React](https://reactjs.org/) Interface                                             |
| 🔌 **Connectors**                     |
| _Browser Extension/dApp Browser_      |
| `@hmy-react/injected-connector`      | [![npm version](https://img.shields.io/npm/v/@hmy-react/injected-connector/latest.svg)](https://www.npmjs.com/package/@hmy-react/injected-connector/v/latest)           | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/injected-connector/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/injected-connector@latest)           | [Injected](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) Connector |
| _Remote API_                          |
| `@hmy-react/network-connector`       | [![npm version](https://img.shields.io/npm/v/@hmy-react/network-connector/latest.svg)](https://www.npmjs.com/package/@hmy-react/network-connector/v/latest)             | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/network-connector/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/network-connector@latest)             | [RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) Connector                     |
| _Hardware_                            |
| `@hmy-react/ledger-connector`        | [![npm version](https://img.shields.io/npm/v/@hmy-react/ledger-connector/latest.svg)](https://www.npmjs.com/package/@hmy-react/ledger-connector/v/latest)               | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/ledger-connector/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/ledger-connector@latest)               | [Ledger](https://www.ledger.com/) Connector                                         |
| _Hosted_                              |
| `@hmy-react/fortmatic-connector`     | [![npm version](https://img.shields.io/npm/v/@hmy-react/fortmatic-connector/latest.svg)](https://www.npmjs.com/package/@hmy-react/fortmatic-connector/v/latest)         | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/fortmatic-connector/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/fortmatic-connector@latest)         | [Fortmatic](https://fortmatic.com/) Connector                                       |
| 🐉 **Low-Level**                      |
| `@hmy-react/abstract-connector`      | [![npm version](https://img.shields.io/npm/v/@hmy-react/abstract-connector/latest.svg)](https://www.npmjs.com/package/@hmy-react/abstract-connector/v/latest)           | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/abstract-connector/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/abstract-connector@latest)           | Shared Connector Class                                                              |
| `@hmy-react/types`                   | [![npm version](https://img.shields.io/npm/v/@hmy-react/types/latest.svg)](https://www.npmjs.com/package/@hmy-react/types/v/latest)                                     | [![minzip](https://img.shields.io/bundlephobia/minzip/@hmy-react/types/latest.svg)](https://bundlephobia.com/result?p=@hmy-react/types@latest)                                     | Shared [TypeScript](https://www.typescriptlang.org/) Types                          |

## Quickstart

[![Edit hmy-react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/harmony-one/hmy-react/tree/v6/example?fontsize=14&hidenavigation=1&theme=dark)

## [Documentation](docs)

## Local Development

- Clone repo\
  `git clone https://github.com/harmony-one/hmy-react.git`

- Install top-level dependencies\
  `yarn`

- Install sub-dependencies\
  `yarn bootstrap`

- Build and watch for changes\
  `yarn start`
