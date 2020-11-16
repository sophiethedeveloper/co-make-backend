exports.seed = function (knex) {
  return knex("posts").insert([
    {
      post:
        "overgrown plants in our front yard. Someone needs to cut the grass asap",
      user_id: 1,
    },
    {
      post: "the road has potholes and my tires are getting damaged",
      user_id: 1,
    },
    { post: "my kitchen sink has a leaking", user_id: 1 },
  ]);
};
