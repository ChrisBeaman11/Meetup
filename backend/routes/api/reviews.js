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

router.get("/current", requireAuth, async (req, res) => {
 //TODO get preview image from spot images
  let arr = [];
  let userId = req.user.id;
  let reviews = await Review.findAll({
    where: {
      userId: userId,
    },
  });
  for (let review of reviews) {
    let pojo = review.toJSON();

    let user = await User.findByPk(userId, {
      attributes: ["id", "firstName", "lastName"],
    });
    pojo.User = user;
    let spot = await Spot.findOne({
      where: {
        ownerId: user.id,
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
          spotId: review.spotId
      },
  })
    let pojo1 = spot.toJSON();
    pojo1.previewImage = spotImage.url;
    pojo.Spot = pojo1;
    let reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id,
      },
      attributes: ["id", "url"],
    });
    pojo.ReviewImages = reviewImages;
    arr.push(pojo)
  }
  return res.json({"Reviews": arr});
});

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    let reviewId = req.params.reviewId;
    const {url} = req.body;
    let review = await Review.findByPk(reviewId);
    if(review){
    let image = await ReviewImage.create({
        url
    })
    let pojo = image.toJSON();
    delete pojo.createdAt;
    delete pojo.updatedAt;
    return res.json(pojo);
}
else{
    return res.json({
        "message": "Review couldn't be found"
      });
}
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    let errors = {};
    let userId = req.user.id;
    let reviewId = req.params.reviewId;
    let thisReview = await Review.findByPk(reviewId);
    const {review, stars} = req.body;
    if(thisReview){
        const newReview = await Review.create({
            userId: userId,
            spotId: thisReview.spotId,
            review,
            stars
        })
        if(!req.body.review){
            errors.review = "Review text is required";
        }
        if(req.body.stars > 5 || req.body.stars <1){
            errors.stars = "Stars must be an integer from 1 to 5";
        }
        if(!Object.keys(errors).length){
            res.status(200);
            return res.json(newReview);
            }
            else{
                res.status(400);
                return res.json({
                    "message": "Bad Request", errors
                });
            }
    }
    else{
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          });
    }
})
router.delete('/:reviewId', requireAuth, async (req, res) => {
    let reviewId = req.params.reviewId;
    let review = await Spot.findByPk(reviewId);
    if(review){
        await review.destroy();
        return res.json({
            "message": "Successfully deleted"
          });
    }
    else{
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          });
    }
})


module.exports = router;
