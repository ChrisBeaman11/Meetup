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

router.get('/current', requireAuth, async (req, res) => {
    //TODO double check cuz im tired af
    let userId = req.user.id;
    let arr = [];
    let bookings = await Booking.findAll({
        where: {
            userId: userId
        }
    })
    for(let booking of bookings){
    let pojo = booking.toJSON();
    let spot = await Spot.findOne({
        where: {
            id: booking.spotId
        }
    })
    pojo.Spot = spot;
    arr.push(pojo);
}
    res.json({"Bookings": arr});

})
module.exports = router;
