const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test");

before((done) => {
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

beforeEach((done) => {
  const { users, comments, blogPosts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      });
    });
  });
});
