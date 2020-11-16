exports.seed = function (knex) {
  // Inserts seed entries
  return knex("users").insert([
    { email: "sofia@gmail.com", password: "12345" },
    { email: "brian@gmail.com", password: "12345" },
  ]);
};
