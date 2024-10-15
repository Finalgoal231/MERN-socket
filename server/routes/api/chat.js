const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/test", (req, res) => res.json({ msg: "Chat works!" }));

const { sendMessage, getMessage } = require("../../controller/chatController");
router.post("/send", sendMessage);

router.get("/receive", getMessage);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
