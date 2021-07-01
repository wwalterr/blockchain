# Blockchain

Simplified private Blockchain

## About

A simplified private Blockchain implementation that stores digital assets privately and uses the wallet to sign the blocks and identify the resources.

## Built with

- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node](https://nodejs.org/en/)
- [Bitcoin Core](https://bitcoin.org/en/bitcoin-core/)
- [Express](https://expressjs.com/)

## Installation

Use the block validator [Bitcoin Core](https://bitcoin.org/en/download) to use the Bitcoin test net, create a wallet, get test [faucets](https://en.bitcoin.it/wiki/Testnet#Faucets), get a [legacy wallet address](https://github.com/bitcoin/bitcoin/issues/16178) and [sign messages](https://bitcoin.stackexchange.com/questions/3898/how-does-sign-message-work) with the wallet. Set `prune=550` to reduce amount of blocks stored locally and `testnet=1` to enable test net in _~/.bitcoin/bitcoin.conf_.

Use the package manager [Yarn](https://yarnpkg.com/getting-started/install) to install the dependencies.

```bash
yarn
```

## Usage

Start a server.

```sh
yarn start
```

## Documentation

Use the HTTP client [Insomnia](https://insomnia.rest/) to load the [insomnia](./insomnia.json) playground and read the documentation for each endpoint.

This Blockchain can store any type of digital asset, for that type `CTRL` + `SHIFT` + `F` and replace all "star" mentions by the name of digital asset that you want to store. If you want to store files, use the helper encode / decode function in [utils](./source/utils), encode the information inside the "star" (your resource name) route or create a endpoint to encode / decode and just pass the information encoded as a key inside "star" (your resource name).

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
