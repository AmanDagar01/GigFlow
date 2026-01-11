import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig" },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: Number,
  message: String,
  status: { type: String, enum: ["pending", "hired", "rejected"], default: "pending" }
});

export default mongoose.model("Bid", bidSchema);
