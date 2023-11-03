const axios = require("axios");
const jsdom = require("jsdom");
const express = require("express");
const app = express();
const { JSDOM } = jsdom;
const Codechef = require("../models/contestModels/codechefModel");
const User = require("../models/userModel");
const { get } = require("mongoose");

// @desc Get codechef profile
// @route Get api/contests/codechef/:id
// @access public

const getCodechefProfile = async (req, res) => {
  try {
    let data = await axios.get(
      `https://www.codechef.com/users/${req.params.id}`
    );
    let dom = new JSDOM(data.data);
    let document = dom.window.document;
    res.status(200).send({
      success: true,
      profile: document.querySelector(".user-details-container").children[0]
        .children[0].src,
      name: document.querySelector(".user-details-container").children[0]
        .children[1].textContent,
      currentRating: parseInt(
        document.querySelector(".rating-number").textContent
      ),
      highestRating: parseInt(
        document
          .querySelector(".rating-number")
          .parentNode.children[4].textContent.split("Rating")[1]
      ),
      countryFlag: document.querySelector(".user-country-flag").src,
      countryName: document.querySelector(".user-country-name").textContent,
      globalRank: parseInt(
        document.querySelector(".rating-ranks").children[0].children[0]
          .children[0].children[0].innerHTML
      ),
      countryRank: parseInt(
        document.querySelector(".rating-ranks").children[0].children[1]
          .children[0].children[0].innerHTML
      ),
      stars: document.querySelector(".rating").textContent || "unrated",
    });
  } catch (err) {
    console.log(err);
    res.send({ success: false, error: err });
  }
};

// @desc Update codechef profile
// @route PUT api/contests/codechef/:id
// @access public
const updateCodechefProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const response = await axios.get(
      "http://localhost:5001/api/contests/codechef/" + user.codechefId
    );
    const responseData = response.data;
    try {
      const codechef = await Codechef.findOne({ user_id: req.params.id });
      if (codechef) {
        codechef.success = true;
        codechef.profile = responseData.profile;
        codechef.name = responseData.name;
        codechef.currentRating = responseData.currentRating;
        codechef.highestRating = responseData.highestRating;
        codechef.globalRank = responseData.globalRank;
        codechef.countryRank = responseData.countryRank;
        codechef.stars = responseData.stars;
        await codechef.save();
        res.status(201).send({ success: true, data: codechef });
      } else {
        console.log("No document found");
      }
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.log(err);
    res.send({ success: false, error: err });
  }
};

module.exports = { getCodechefProfile, updateCodechefProfile };
