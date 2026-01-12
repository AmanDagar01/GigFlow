import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gig", required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "hired", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Bid", bidSchema);
