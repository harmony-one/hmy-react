# `hmy-react` Documentation - Connectors

Connectors are stand-alone packages that interface with `hmy-react` and manage connections to a single type of Harmony node or wallet. To give an example: it's quite common for dApp users to rely on browser extensions such as [OneWallet](https://chrome.google.com/webstore/detail/harmony-one-wallet/gldpceolgfpjnajainimdfghhhgcnfmf?hl=en-US) to manage their account for them. So, `hmy-react` defines a connector that's responsible for interfacing with browser extensions. The current list of first-party `hmy-react` connectors can be found in the [top-level README.md](../../).

One enormous benefit to `hmy-react` is that it's incredibly easy to extend existing/create new connectors! They're very simple Javascript class objects which simply need to define a few functions to be fully compatible with the rest of `hmy-react`.

For more information on specific first-party connectors, see the individual files in this folder.
