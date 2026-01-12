import Bid from "../models/Bid.js";
import mongoose from "mongoose";
import Gig from "../models/Gig.js";

export const placeBid = async (req, res) => {
  try {
    const bid = await Bid.create({
      ...req.body,
      freelancerId: req.user.id
    });
    
    // Populate freelancer details before sending response
    await bid.populate("freelancerId", "name email");
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBidsForGig = async (req, res) => {
  try {
    const bids = await Bid.find({ gigId: req.params.gigId })
      .populate("freelancerId", "name email")
      .populate("gigId", "title");
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bonus 1: Transactional Integrity (Race Conditions) - MongoDB Transactions
export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) throw new Error("Bid not found");

    const gig = await Gig.findOne({
      _id: bid.gigId,
      ownerId: req.user.id,
      status: "open"
    }).session(session);

    if (!gig) throw new Error("Gig already assigned or unauthorized");

    // 1️⃣ Mark selected bid as hired
    await Bid.updateOne(
      { _id: bid._id },
      { status: "hired" },
      { session }
    );

    // 2️⃣ Reject all other bids for this gig
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    // 3️⃣ Mark gig as assigned
    await Gig.updateOne(
      { _id: gig._id },
      { status: "assigned" },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    // Fetch and return the updated bid with populated details
    const updatedBid = await Bid.findById(req.params.bidId)
      .populate("freelancerId", "name email")
      .populate("gigId", "title");

    res.json(updatedBid);

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};
