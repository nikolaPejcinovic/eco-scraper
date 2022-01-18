module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      headline: String,
      deck: String,
      link: String,
      imgUrl: String,
      textParagraphs: [String],
      date: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const Article = mongoose.model("article", schema);

  return Article;
};
