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
        "lat",
        "lng",
        "name",
        "price",
      ],
    });
    pojo.Spot = spot;
    let reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: review.id,
      },
      attributes: ["id", "url"],
    });
    pojo.ReviewImages = reviewImages;
    arr.push(pojo)
  }
  res.json({"Reviews": arr});
});

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    let reviewId = req.params.reviewId;
    const {url} = req.body;
    let review = await findByPk(reviewId);
    if(review){
    let image = ReviewImage.Create({
        url
    })
    res.json(review);
}
else{
    res.json({
        "message": "Review couldn't be found"
      });
}
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    let errors = {};
    let userId = this.user.id;
    let reviewId = req.params.reviewId;
    let thisReview = await findByPk(reviewId);
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
            res.json(newReview);
            }
            else{
                res.status(400);
                res.json({
                    "message": "Bad Request", errors
                });
            }
    }
    else{
        res.status(404);
        res.json({
            "message": "Review couldn't be found"
          });
    }
})
router.delete('/:reviewId', requireAuth, async (req, res) => {
    let reviewId = req.params.reviewId;
    let review = await Spot.findByPk(reviewId);
    if(review){
        await review.destroy();
        res.json({
            "message": "Successfully deleted"
          });
    }
    else{
        res.status(404);
        res.json({
            "message": "Review couldn't be found"
          });
    }
})


module.exports = router;
