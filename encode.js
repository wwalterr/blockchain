const fs = require("fs");

const encodeHex = (path, encode = "hex") => {
  const file = fs.readFileSync(path);

  return new Buffer(file).toString(encode);
};

const decodeHex = (path, code, encode = "hex") => {
  const buffer = new Buffer(code, encode);

  fs.writeFileSync(path, buffer);
};

module.exports = {
  encodeHex,
  decodeHex,
};
