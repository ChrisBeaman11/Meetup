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
    //TODO get preview image from spot images and exclude description
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

router.put('/:bookingId', requireAuth, async (req, res) => {
//TODO THIS need figure out how to compare dates
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    //TODO
    //ALMOST WORKS NEED CHECK IF BOOKING HAS STARTED AND return error if so
    let bookingId = req.params.bookingId;
    let booking = await Booking.findByPk(bookingId);
    if(booking){
        await booking.destroy();
        res.json({
            "message": "Successfully deleted"
          });
    }
    else{
        res.status(404);
        res.json({
            "message": "Booking couldn't be found"
          });
    }
})



module.exports = router;
