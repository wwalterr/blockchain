const bitcoinMessage = require("bitcoinjs-message");

const utils = require("./utils");

const block = require("./block");

class Blockchain {
  #chain;

  constructor() {
    this.#chain = [];

    this.#startChain();
  }

  async #startChain() {
    await this.addBlock(new block.Block("Root"));
  }

  get chain() {
    return this.#chain;
  }

  addBlock(block) {
    const self = this;

    return new Promise((resolve, reject) => {
      try {
        block.hash = utils.hash(block);

        block.height = self.chain.length;

        block.time = utils.time();

        if (self.#chain.length)
          block.previousBlockHash = self.#chain[self.#chain.length - 1].hash;

        self.#chain.push(block);

        resolve(block);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  ownership(address) {
    return new Promise((resolve, reject) => {
      try {
        resolve(`${address}:${utils.time()}:digitalAssetRegistry`);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  submitDigitalAsset(address, message, signature, digitalAsset) {
    const self = this;

    return new Promise(async (resolve, reject) => {
      try {
        const messageTime = parseInt(message.split(":")[1]);

        const currentTime = parseInt(utils.time());

        // Check if the 5 minute validation was elapsed
        if (currentTime - messageTime > 300) reject("Block time elapsed");

        if (!bitcoinMessage.verify(message, address, signature))
          reject("Error in message verification");

        const _block = new block.Block({
          address,
          message,
          signature,
          digitalAsset,
        });

        await self.addBlock(_block);

        resolve(_block);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  blockByHash(hash) {
    const self = this;

    return new Promise((resolve, reject) => {
      try {
        resolve(self.#chain.filter((block) => block.hash === hash));
      } catch (error) {
        reject(error.message);
      }
    });
  }

  blockByHeight(height) {
    const self = this;

    return new Promise((resolve, reject) => {
      try {
        resolve(self.#chain[height]);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  digitalAssetsByWalletAddress(address) {
    const self = this;

    return new Promise(async (resolve, reject) => {
      const log = [];

      try {
        for (const _block of self.#chain)
          if (_block.height && !(await _block.validate())) log.push(_block);

        resolve(log);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}

module.exports = {
  Blockchain,
};
