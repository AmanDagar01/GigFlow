import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  try {
    const gig = await Gig.create({
      ...req.body,
      ownerId: req.user.id
    });
    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGigs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { status: "open" };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    
    const gigs = await Gig.find(query).populate("ownerId", "name email");
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigById = async (req, res) => {
  try {
    const { id } = req.params;
    const gig = await Gig.findById(id).populate("ownerId", "name email");
    
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }
    
    res.json(gig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
