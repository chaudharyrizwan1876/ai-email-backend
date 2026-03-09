const express = require("express");
const router = express.Router();

const Signature = require("../models/Signature");

/*
POST /signature/save
Save signature to DB
*/

router.post("/save", async (req, res) => {
  try {

    const { name, role, company, website, workingHours, photo } = req.body;

    // remove old signature (only 1 allowed)
    await Signature.deleteMany({});

    const signature = await Signature.create({
      name,
      role,
      company,
      website,
      workingHours,
      photo,
    });

    res.json({
      success: true,
      signature,
    });

  } catch (err) {

    console.error("Signature save error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to save signature",
    });

  }
});


/*
GET /signature
Fetch saved signature
*/

router.get("/", async (req, res) => {
  try {

    const signature = await Signature.findOne();

    if (!signature) {
      return res.json({
        success: true,
        signature: null,
      });
    }

    res.json({
      success: true,
      signature,
    });

  } catch (err) {

    console.error("Signature fetch error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch signature",
    });

  }
});


/*
DELETE /signature/delete
Delete signature from DB
*/

router.delete("/delete", async (req, res) => {
  try {

    await Signature.deleteMany({});

    res.json({
      success: true,
      message: "Signature deleted successfully",
    });

  } catch (err) {

    console.error("Signature delete error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete signature",
    });

  }
});


module.exports = router;