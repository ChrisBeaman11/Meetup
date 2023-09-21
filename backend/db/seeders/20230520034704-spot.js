'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 2,
        address: '1400 this lane',
        city: 'Albany',
        state: 'New York',
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Desert Dream Home",
        description: "Our stay in the Desert Dream Home was pure luxury. Every room had stunning desert views. We relaxed by the pool, soaked in the spa, and enjoyed desert sunsets. A desert paradise!",
        price: 123
      },
      {
        ownerId: 2,
        address: '2500 that lane',
        city: 'Weirton',
        state: 'West Virginia',
        country: "United States",
        lat: 39.7645358,
        lng: -124.4730327,
        name: "Urban Oasis",
        description: "This Urban Oasis exceeded our expectations. The loft is stylish, and the city views from the rooftop pool are stunning. We explored the vibrant neighborhood, trying out amazing restaurants. A fantastic city stay!",
        price: 125
      },
      {
        ownerId: 2,
        address: '3500 that lane',
        city: 'Weirton',
        state: 'West Virginia',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Rustic Riverside Retreat",
        description: "Our stay at the Rustic Riverside Retreat was pure serenity. Nestled by the river, the cottage had a welcoming charm. Days were spent fishing from our private dock, and evenings by the bonfire were magical. If you crave nature's embrace and tranquility, this is your spot!",
        price: 200
      },
      {
        ownerId: 2,
        address: '4500 that lane',
        city: 'Weirton',
        state: 'West Virginia',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Secluded Treehouse",
        description: "The Secluded Treehouse is a whimsical gem. Sleeping among the trees was enchanting. We spent our days bird-watching and nights stargazing from the canopy bed. Truly a one-of-a-kind escape!",
        price: 127
      },
      {
        ownerId: 3,
        address: '1000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Lakeside Cottage",
        description: "The Lakeside Cottage was a tranquil haven. We fished, kayaked, and simply savored the lake life. The cottage had all we needed, and we couldn't get enough of the serene waterside setting. A must for nature lovers!",
        price: 175
      },
      {
        ownerId: 3,
        address: '2000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Mountain View Lodge",
        description: "Our stay at the Mountain View Lodge was a dream come true. Hiking trails at our doorstep, followed by a soak in the hot tub, was the perfect combo. The lodge's rustic charm and mountain vistas are unforgettable.",
        price: 252
      },
      {
        ownerId: 3,
        address: '3000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Historic Hideaway",
        description: "Staying in the Historic Hideaway was like stepping back in time, but with all modern comforts. We loved walking to historic sites and dining at local spots. A unique and charming experience!",
        price: 300
      },
      {
        ownerId: 3,
        address: '4000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Beachfront Paradise",
        description: "Words can't describe the beauty of this Beachfront Paradise. Waking up to the ocean outside your window is breathtaking. We spent our days sunbathing and evenings with sunset views. It's a slice of heaven!",
        price: 240
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
