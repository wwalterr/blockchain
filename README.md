# Blockchain

Simplified private Blockchain

## About

A simplified private Blockchain implementation that stores digital assets privately and uses the wallet to sign the blocks and identify the resources.

## Built with

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node](https://nodejs.org/en/)
- [Bitcoin Core](https://bitcoin.org/en/bitcoin-core/)
- [Bitcoin JS](https://github.com/bitcoinjs/bitcoinjs-lib)
- [Bitcoin Message](https://github.com/bitcoinjs/bitcoinjs-message)
- [Crypto JS](https://github.com/brix/crypto-js)
- [Express](https://expressjs.com/)

## Installation

Use the block validator [Bitcoin Core](https://bitcoin.org/en/download) to use the Bitcoin test net, create a wallet, get test [faucets](https://en.bitcoin.it/wiki/Testnet#Faucets), get a [legacy wallet address](https://github.com/bitcoin/bitcoin/issues/16178) and [sign messages](https://bitcoin.stackexchange.com/questions/3898/how-does-sign-message-work) with the wallet. Set `prune=550` to reduce amount of blocks stored locally and `testnet=1` to enable test net in _~/.bitcoin/bitcoin.conf_.

Use the package manager [Yarn](https://yarnpkg.com/getting-started/install) to install the dependencies.

```sh
yarn
```

## Usage

Start a server.

```sh
yarn start
```

## Documentation

Use the [Insomnia](https://insomnia.rest/) HTTP client to load the [Blockchain](./insomnia.json) playground and read the documentation for each endpoint.

Use [utils](./source/utils.js) functions to encode and decode binary digital assets like image, document, video, etc; and store in the chain.

## Contributing

Pull requests are welcome. Please, consider the following.

1. Make sure you code have quality, a.k.a standards
2. Make sure your code is secure
3. Make sure your code has no performance issues
4. Make sure your code is documented, if necessary
5. Describe the changes that were done

> No issue or PR template required, but be informative

## License

[MIT](./LICENSE.md)
