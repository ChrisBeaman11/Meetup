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
        },
        attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "price",
          ],
        });
        let spotImage = await SpotImage.findOne({
            where: {
                spotId: booking.spotId
            },
        })
        let pojo1 = spot.toJSON();
        pojo1.previewImage = spotImage.url;
        pojo.Spot = pojo1;
        arr.push(pojo);
}
    return res.json({"Bookings": arr});

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
        return res.json({
            "message": "Successfully deleted"
          });
    }
    else{
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found"
          });
    }
})



module.exports = router;
