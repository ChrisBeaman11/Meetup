const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const {
  User,
  Booking,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  sequelize,
} = require("../../db/models");
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    let imageId = req.params.imageId;
    //TODO all this
})



module.exports = router;
