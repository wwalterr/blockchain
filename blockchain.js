const SHA256 = require("crypto-js/sha256");

const time = () => new Date().getTime().toString().slice(0, -3);

class Block {
  constructor(data) {
    this.hash = "";

    this.height = 0;

    this.body = data;

    this.time = time();

    this.previousBlockHash = "";
  }
}

class Blockchain {
  #chain;

  constructor() {
    this.#chain = [];

    this.addBlock(new Block("Root"));
  }

  get chain() {
    return this.#chain;
  }

  addBlock(block) {
    block.hash = SHA256(JSON.stringify(block)).toString();

    block.height = this.chain.length;

    block.time = time();

    if (this.#chain.length)
      block.previousBlockHash = this.#chain[this.#chain.length - 1].hash;

    this.#chain.push(block);
  }
}

module.exports = {
  Block,
  Blockchain,
};
