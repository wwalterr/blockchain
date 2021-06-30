const express = require("express");

const morgan = require("morgan");

const components = require("./blockchain");

const controller = require("./controller");

class Server {
  #application;

  #blockchain;

  #port;

  #log;

  constructor(port = 8000, log = "dev") {
    this.#application = express();

    this.#blockchain = new components.Blockchain();

    this.#port = port;

    this.#log = log;

    this.#settings();

    this.#middleWares();

    this.#controller();

    this.#start();
  }

  #settings() {
    this.#application.set(this.#port);
  }

  #middleWares() {
    this.#application.use(express.json());

    this.#application.use(express.urlencoded({ extended: true }));

    this.#application.use(morgan(this.#log));
  }

  #controller() {
    new controller.Controller(this.#application, this.#blockchain);
  }

  #start() {
    this.#application.listen(this.#port, () => {
      console.log(
        `Server listening on http://localhost:\x1b[32m${this.#port}\x1b[0m`
      );
    });
  }
}

new Server();
