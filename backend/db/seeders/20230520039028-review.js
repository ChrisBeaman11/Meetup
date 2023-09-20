'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "We had a fantastic stay! The location was perfect, and we highly recommend it to anyone looking for a great experience."
        ,
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: "The listing photos were misleading, and the place was much smaller than expected. Our stay was a letdown.",
        stars: 2
      },
      {
        spotId: 2,
        userId: 1,
        review: "This place had potential, but it lacked basic amenities and comfort. We left disappointed.",
        stars: 2
      },
      {
        spotId: 2,
        userId: 3,
        review: "This cozy getaway was perfect for our romantic weekend. The ambiance was lovely, and we'll definitely return.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: "Immaculate cleanliness, outstanding service - a true 5-star experience. We can't wait to come back.",
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: "We encountered several maintenance issues during our stay. It was far from the relaxing getaway we had hoped for.",
        stars: 2
      },
      {
        spotId: 4,
        userId: 1,
        review: "The host was unresponsive, and the cleanliness was subpar. We won't be returning.",
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        review: "Affordable luxury at its finest! We were pleasantly surprised and will definitely return for another stay.",
        stars: 4
      },
      {
        spotId: 5,
        userId: 2,
        review: "The host's hospitality exceeded our expectations. They went above and beyond to ensure we had a wonderful stay.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: "Don't waste your money here. We had a terrible experience and wouldn't recommend it to anyone.",
        stars: 1
      },
      {
        spotId: 6,
        userId: 2,
        review: "Overpriced and underwhelming. We expected more for the price we paid.",
        stars: 2
      },
      {
        spotId: 6,
        userId: 1,
        review: "We were captivated by the breathtaking views from the balcony. Pictures don't do justice to this stunning location.",
        stars: 5
      },
      {
        spotId: 7,
        userId: 2,
        review: "Our stay in this charming place was ideal for our romantic escape. We loved every moment of it.",
        stars: 4
      },
      {
        spotId: 7,
        userId: 1,
        review: "This place was a letdown. It was not as advertised, and we had numerous issues during our stay.",
        stars: 2
      },
      {
        spotId: 8,
        userId: 2,
        review: "Our stay was disappointing. The location was noisy, and the service left much to be desired.",
        stars: 2
      },
      {
        spotId: 8,
        userId: 1,
        review: "A hidden gem in the heart of the city. This place oozes charm and is a great find for any traveler.",
        stars: 5
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
