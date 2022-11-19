const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
