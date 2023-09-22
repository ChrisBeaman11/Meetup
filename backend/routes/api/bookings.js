const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");

const {
  Booking,
  Spot,
  SpotImage
} = require("../../db/models");
const { Op } = require("sequelize");
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
        pojo1.previewImage = spotImage ? spotImage.url: null;
        pojo.Spot = pojo1;
        arr.push(pojo);
}
    return res.json({"Bookings": arr});

})

router.put('/:bookingId', requireAuth, async (req, res) => {
    let errors = {};
    let userId = req.user.id;
    let bookingId = req.params.bookingId;
    let {startDate, endDate} = req.body;
    let date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let bookingToUpdate = await Booking.findByPk(bookingId);
    if(bookingToUpdate){
        let bookings = await Booking.findAll({
            where: {
                id: {[Op.not]: bookingId}
            }
        })
        if(startDate>endDate){
            res.status(400);
            return res.json({
                "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
                "errors": {
                  "endDate": "endDate cannot come before startDate"
                }
              });
        }
        if(bookingToUpdate.endDate< currentDate){
            res.status(403);
            return res.json({
                "message": "Past bookings can't be modified"
              })
        }
        for(let booking of bookings){
            if(booking.startDate <=startDate && booking.endDate>=startDate){
                errors.startDate = "Start date conflicts with an existing booking";
            }
            if(booking.startDate <=endDate && booking.endDate>=endDate){
                errors.endDate = "End date conflicts with an existing booking";
            }
        }
        if(Object.keys(errors).length){
            res.status(403);
             return res.json({message: "Sorry, this spot is already booked for the specified dates",
            errors})
        }
        else{
            let newBooking = await Booking.create({
                userId: userId,
                spotId: bookingToUpdate.spotId,
                startDate,
                endDate
            })
            return res.json(newBooking);
        }
    }
    else{
        res.status(404);
        res.json({
            "message": "Booking couldn't be found"
          });
    }
})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    let date = new Date();
    let currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let bookingId = req.params.bookingId;
    let booking = await Booking.findByPk(bookingId);
    if(booking){
        // if(booking.startDate<currentDate){
        //     res.status(403);
        //     return res.json({
        //         "message": "Bookings that have been started can't be deleted"
        //       });
        // }
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
