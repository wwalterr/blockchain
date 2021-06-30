class Controller {
  #application;

  #blockchain;

  constructor(application, blockchain) {
    this.#application = application;

    this.#blockchain = blockchain;

    //Endpoints
    this.ping();

    this.blockByHeight();

    this.requestOwnership();

    this.submitStar();

    this.blockByHash();

    this.starsByOwner();
  }

  // Test
  ping() {
    this.#application.get("/ping", (request, response) => {
      response.send("pong");
    });
  }

  // GET block by height
  blockByHeight() {
    this.#application.get(
      "/block/height/:height",
      async (request, response) => {
        if (request.params.height) {
          const height = parseInt(request.params.height);

          const block = await this.#blockchain.blockByHeight(height);

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

  // POST to submit a star, need first to request ownership to have the message
  submitStar() {
    this.#application.post("/submitStar", async (request, response) => {
      if (
        request.body.address &&
        request.body.message &&
        request.body.signature &&
        request.body.star
      ) {
        try {
          const block = await this.#blockchain.submitStar(
            request.body.address,
            request.body.message,
            request.body.signature,
            request.body.star
          );

          return block
            ? response.status(200).json(block)
            : response.status(500).send("An internal error happened");
        } catch (error) {
          return response.status(500).send(error.message);
        }
      } else {
        return response.status(500).send("Check the required body parameters");
      }
    });
  }

  // This endpoint allows you to request the list of Stars registered by an owner
  starsByOwner() {
    this.#application.get("/blocks/:address", async (request, response) => {
      if (request.params.address) {
        try {
          const stars = await this.#blockchain.starsByWalletAddress(
            request.params.address
          );

          return stars
            ? response.status(200).json(stars)
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
