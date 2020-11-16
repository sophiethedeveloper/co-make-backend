const db = require("../database/db-config.js");

module.exports = {
  getAll,
  addPost,
  getById,
  update,
};

function getAll() {
  return db("posts");
}

function getById(id) {
  return db("posts").where({ id }).first();
}

async function addPost(user) {
  try {
    const [id] = await db("posts").insert(user, "id");
    return getById(id);
  } catch (error) {
    throw error;
  }
}

function update(id, changes) {
  return db("posts").where({ id }).update(changes);
}
