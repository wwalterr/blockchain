const SHA256 = require("crypto-js/sha256");

const fs = require("fs");

const time = () => new Date().getTime().toString().slice(0, -3);

const hash = (block) => SHA256(JSON.stringify(block)).toString();

const encodeHex = (path, encode = "hex") => {
  const file = fs.readFileSync(path);

  return new Buffer(file).toString(encode);
};

const decodeHex = (path, code, encode = "hex") => {
  const buffer = new Buffer(code, encode);

  fs.writeFileSync(path, buffer);
};

const removeObjectKey = (key, { [key]: omit, ...rest }) => rest;

module.exports = {
  time,
  hash,
  encodeHex,
  decodeHex,
  removeObjectKey,
};
