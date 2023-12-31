const asyncHandler = require("express-async-handler");
const Contest = require("../models/contestModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//@desc Get all Contests
//@route Get /api/contests
//@access public
const getContests = asyncHandler(async (req, res) => {
  const contests = await Contest.find();
  res.status(200).json(contests);
});

// @desc get Contest
// @route GET /api/contests/:id
// @access public
const getContest = asyncHandler(async (req, res) => {
  const contest = await Contest.findById(req.params.id);
  if (!contest) {
    res.status(404);
    throw new Error("Contest not found");
  }
  res.status(200).json(contest);
});

//@desc update Contest
//@route PUT /api/contests/:id
//@access private

const updateContest = asyncHandler(async (req, res) => {
  const contest = await Contest.findById(req.params.id);
  if (!contest) {
    res.status(404);
    throw new Error("Contest not found");
  }
  const updatedContest = await Contest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedContest);
});

//@desc post Contest
//@route POST /api/contests
//@access private
const postContests = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      description,
      startTime,
      totalParticipant,
    } = req.body;

    // Check if the contest is already registered

    const contest = await Contest.create({
      name,
      description,
      startTime,
      totalParticipant,
    });
    res.status(200).json(contest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  getContests,
  getContest,
  updateContest,
  postContests,
};
