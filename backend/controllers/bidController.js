import Bid from "../models/Bid.js";
import mongoose from "mongoose";
import Gig from "../models/Gig.js";

export const placeBid = async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.id
  });
  res.status(201).json(bid);
};

export const getBidsForGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

// i took a help of AI for this section
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

    // 2️⃣ Reject all other bids
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

    res.json({ message: "Freelancer hired successfully" });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ error: error.message });
  }
};
