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
    let image = await ReviewImage.findByPk(imageId);
    if(image){
        await image.destroy();
        return res.json({
            "message": "Successfully deleted"
          })
    }
    else{
        res.status(404);
        return res.json({
            "message": "Review Image couldn't be found"
          });
    }
})

module.exports = router;
