const db = require("../database/db-config.js");

module.exports = {
  getAll,
};

function getAll() {
  return db("posts");
}
