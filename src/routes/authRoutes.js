const express = require("express");
const User = require("../models/User");
const Signature = require("../models/Signature");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend"); // ✅ NEW
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Resend init
const resend = new Resend(process.env.RESEND_API_KEY);

/* ================= TEST ================= */

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth route is working",
  });
});

/* ================= SEND EMAIL ================= */

router.post("/send-email", protect, async (req, res) => {
  try {

    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const signature = await Signature.findOne();

    let signatureHtml = "";
    let attachments = [];

    if (signature) {

      let signatureImage = "";

      if (signature?.photo) {
        signatureImage = `
    <td style="padding-right:10px">
      <img src="${signature.photo}" width="70" height="70"
           style="object-fit:cover;border-radius:4px"/>
    </td>
  `;
      }

      signatureHtml = `
<br/><br/>

<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif">

  <tr>

    ${signatureImage}

    <td>

      <div style="font-weight:bold;font-size:14px">
        ${signature.name || ""}
      </div>

      <div style="font-size:13px;color:#555">
        ${signature.role || ""} ${signature.company ? `| ${signature.company}` : ""
        }
      </div>

      ${signature.website
          ? `<div style="font-size:13px">
               <a href="${signature.website}" target="_blank">
                 ${signature.website}
               </a>
             </div>`
          : ""
        }

      ${signature.workingHours
          ? `<div style="font-size:12px;color:#777">
               ${signature.workingHours}
             </div>`
          : ""
        }

    </td>

  </tr>

</table>
`;
    }

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;font-size:14px">
        ${String(message).replace(/\n/g, "<br/>")}
        ${signatureHtml}
      </div>
    `;

    // ✅ RESEND SEND EMAIL
    await resend.emails.send({
      from: "Support <support@joaomiranda.com>", // ✅ verified domain
      to,
      subject,
      html: htmlBody,

      reply_to: "support@joaomiranda.com", // ✅ important

      headers: {
        "X-Entity-Ref-ID": Date.now().toString(), // ✅ avoid duplicate drops
      },
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {

    console.error("SEND EMAIL ERROR FULL:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to send email",
    });

  }
});

/* ================= CREATE EMPLOYEE ================= */

router.post("/create-user", protect, adminOnly, async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      role: "employee",
    });

    res.json({
      success: true,
      message: "Employee created successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.error("CREATE USER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to create user",
    });

  }
});

/* ================= GET ALL EMPLOYEES ================= */

router.get("/users", protect, adminOnly, async (req, res) => {
  try {

    const users = await User.find({ role: "employee" }).select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (err) {

    console.error("GET USERS ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });

  }
});

/* ================= DELETE EMPLOYEE ================= */

router.delete("/user/:id", protect, adminOnly, async (req, res) => {
  try {

    const user = await User.findOne({
      _id: req.params.id,
      role: "employee",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });

  } catch (err) {

    console.error("DELETE USER ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });

  }
});

/* ================= LOGIN ================= */

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {

    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });

  }
});

module.exports = router;