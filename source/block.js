const hex2ascii = require("hex2ascii");

const utils = require("./utils");

class Block {
  constructor(data) {
    this.hash = "";

    this.height = 0;

    this.body = data;

    this.time = 0;

    this.previousBlockHash = "";
  }

  blockData() {
    const self = this;

    return new Promisse((resolve, reject) => {
      try {
        if (self.previousBlockHash === null) reject("root");

        const data = JSON.parse(hex2ascii(self.body));

        resolve(data);
      } catch (error) {
        reject(error.message);
      }
    });
  }

  validate() {
    const self = this;

    return new Promise((resolve, reject) => {
      try {
        const currentHash = self.hash;

        if (currentHash !== utils.hash(self)) resolve(false);

        resolve(true);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}

module.exports = {
  Block,
};