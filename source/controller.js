class Controller {
  #application;

  #blockchain;

  constructor(application, blockchain) {
    this.#application = application;

    this.#blockchain = blockchain;

    // Endpoints
    this.ping();

    this.blockByHeight();

    this.requestOwnership();

    this.submitDigitalAsset();

    this.blockByHash();

    this.digitalAssetsByOwner();
  }

  // Test
  ping() {
    this.#application.get("/ping", (request, response) => {
      response.status(200).send("Pong");
    });
  }

  // GET block by height
  blockByHeight() {
    this.#application.get(
      "/block/height/:height",
      async (request, response) => {
        if (request.params.height) {
          const block = await this.#blockchain.blockByHeight(
            parseInt(request.params.height)
          );

          return block
            ? response.status(200).json(block)
            : response.status(404).send("Block not found");
        } else {
          return response.status(404).send("Block not found");
        }
      }
    );
  }

  // GET block by hash
  blockByHash() {
    this.#application.get("/block/hash/:hash", async (request, response) => {
      if (request.params.hash) {
        const block = await this.#blockchain.blockByHash(request.params.hash);

        return block
          ? response.status(200).json(block)
          : response.status(404).send("Block not found");
      } else {
        return response.status(404).send("Block not found");
      }
    });
  }

  // POST a request to check user ownership of a wallet address
  requestOwnership() {
    this.#application.post("/requestValidation", async (request, response) => {
      if (request.body.address) {
        const message = await this.#blockchain.ownership(request.body.address);

        return message
          ? response.status(200).json(message)
          : response.status(500).send("An internal error happened");
      } else {
        return response.status(500).send("Check the required body parameter");
      }
    });
  }

  // POST to submit a digital asset, need first to request ownership to have the message
  submitDigitalAsset() {
    this.#application.post("/submitDigitalAsset", async (request, response) => {
      const fieldsFilter = Object.keys(request.body).every((key) =>
        ["address", "message", "signature", "digitalAsset"].includes(key)
      );

      if (fieldsFilter) {
        try {
          const block = await this.#blockchain.submitDigitalAsset(
            request.body.address,
            request.body.message,
            request.body.signature,
            request.body.digitalAsset
          );

          response.status(200).json(block);
        } catch (error) {
          return response.status(500).send(error.message);
        }
      } else {
        return response.status(500).send("Check the required body parameters");
      }
    });
  }

  // This endpoint allows you to request the list of digital assets registered by an owner
  digitalAssetsByOwner() {
    this.#application.get("/blocks/:address", async (request, response) => {
      if (request.params.address) {
        try {
          const digitalAssets = await this.#blockchain.digitalAssetsByWalletAddress(
            request.params.address
          );

          return digitalAssets
            ? response.status(200).json(digitalAssets)
            : response.status(404).send("Block not found");
        } catch (error) {
          return response.status(500).send("An internal error happened");
        }
      } else {
        return response.status(500).send("Block not found");
      }
    });
  }
}

module.exports = {
  Controller,
};
