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
    await this.addBlock(new block.Block("root"));
  }

  get chain() {
    return this.#chain;
  }

  addBlock(block) {
    const self = this;

    return new Promise((resolve, reject) => {
      try {
        block.hash = utils.hash(block);

        block.height = self.chain.length + 1;

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
        resolve(`${address}:${utils.time()}:starRegistry`);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  submitStar(address, message, signature, star) {
    const self = this;

    return new Promise(async (resolve, reject) => {
      try {
        const messageTime = parseInt(message.split(":")[1]);

        const currentTime = parseInt(utils.time());

        if (currentTime - messageTime > 300) reject("Block time elapsed");

        if (!bitcoinMessage.verify(message, address, signature))
          reject("Error in message verification");

        const _block = new block.Block({ address, message, signature, star });

        await self.addBlock(_block);

        resolve(_block);
      } catch (error) {
        console.log(error);
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
        resolve(self.#chain.filter((block) => block.height === height));
      } catch (error) {
        reject(error.message);
      }
    });
  }

  starsByWalletAddress(address) {
    const self = this;

    return new Promise(async (resolve, reject) => {
      const logs = [];

      try {
        for (const _block of self.#chain) {
          if (!(await _block.validate())) logs.push(_block);
        }

        resolve(logs);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}

module.exports = {
  Blockchain,
};
