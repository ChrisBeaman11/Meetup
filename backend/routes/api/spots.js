const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Booking, Review, ReviewImage, Spot, SpotImage, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
    let arr = [];

    const spots = await Spot.findAll();
    for(let spot of spots){
        let sumOfStars = 0;
        const numOfReviews = await Review.count({
            where: {
                spotId: spot.id
            }
        });
        const totalStars = await Review.findAll({
            attributes: [ [sequelize.fn('sum', sequelize.col('stars')), 'total']],
            where: {
                spotId: spot.id
            }
        });
        // console.log(totalStars[0].dataValues.total)
        let avgStars = totalStars[0].dataValues.total/numOfReviews;
        let pojo =  spot.toJSON()
            pojo.avgRating = avgStars
            const previewImg = await SpotImage.findAll({
                where:{
                    preview: true,
                    spotId: spot.id
                }
            })
            if(previewImg.length){
                pojo.previewImage = previewImg[0].dataValues.url;
                // console.log(previewImg[0].dataValues);
            }
            if(!previewImg.length){
                pojo.previewImage = null;
            }
            arr.push(pojo);
        }
    res.json({Spots: arr});
})

router.get('/current', requireAuth, async (req, res) =>{
    let arr = [];
    const userId = req.user.id;
    let ownedSpots = await Spot.findAll({
        where: {
            ownerId: userId
        }
    });
    for(let spot of ownedSpots){
        let sumOfStars = 0;
        const numOfReviews = await Review.count({
            where: {
                spotId: spot.id
            }
        });
        const totalStars = await Review.findAll({
            attributes: [ [sequelize.fn('sum', sequelize.col('stars')), 'total']],
            where: {
                spotId: spot.id
            }
        });
        // console.log(totalStars[0].dataValues.total)
        let avgStars = totalStars[0].dataValues.total/numOfReviews;
        let pojo =  spot.toJSON()
            pojo.avgRating = avgStars
            const previewImg = await SpotImage.findAll({
                where:{
                    preview: true,
                    spotId: spot.id
                }
            })
            if(previewImg.length){
                pojo.previewImage = previewImg[0].dataValues.url;
                // console.log(previewImg[0].dataValues);
            }
            if(!previewImg.length){
                pojo.previewImage = null;
            }
            arr.push(pojo);
        }
    res.json({Spots: arr});
})

router.get('/:spotId', async (req, res) => {
    let spotId = parseInt(req.params.spotId);
    let spot = await Spot.findByPk(spotId);
    if(spot){
    const numOfReviews = await Review.count({
        where: {
            spotId: spot.id
        }
    });
    const totalStars = await Review.findAll({
        attributes: [ [sequelize.fn('sum', sequelize.col('stars')), 'total']],
        where: {
            spotId: spot.id
        }
    });
    let avgRating = totalStars[0].dataValues.total/numOfReviews;
    // console.log(avgRating);
    let spotImages = await SpotImage.findAll({
        where: {
            spotId: spotId
        },
        // attributes: {
        //     exclude: ["createdAt", "updatedAt", "spotId"]
        // }
        attributes: ["id", "url", "preview"]
    })
    let owner = await User.findByPk(spot.ownerId, {
        attributes: ["id", "firstName", "lastName"]
    })
    let pojo =  spot.toJSON();
    pojo.numReviews = numOfReviews;
    pojo.avgStarRating = avgRating;
    pojo.SpotImages = spotImages;
    pojo.Owner = owner;
    res.json(pojo);
}
else{
res.json({
    "message": "Spot couldn't be found"
  })
}
})

router.post('/', requireAuth, (req, res) => {
    
})



module.exports = router;
