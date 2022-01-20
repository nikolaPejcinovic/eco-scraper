module.exports = (mongoose) => {
  const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: String,
    })
  );

  return User;
};
