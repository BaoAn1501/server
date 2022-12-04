const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const reviewSchema = new Schema({
  id: { type: ObjectId },
  user_id: { type: Schema.Types.ObjectId, ref: "user" },
  product_id: { type: Schema.Types.ObjectId, ref: "product" },
  status: { type: Boolean, default: false },
  score: { type: Number, required: true },
  remarks: { type: String, default: "" },
});
reviewSchema.set("timestamps", true);
module.exports = mongoose.model("review", reviewSchema);
