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
        description: "Discover luxury in the desert. This sleek oasis offers a pool, spa, and desert views from every room.",
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
        description: "Located in the heart of the city, this modern loft boasts skyline views, a rooftop pool, and easy access to trendy restaurants.",
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
        description: "Escape to this charming riverside cottage. With a private dock, bonfire pit, and serene woodland surroundings, it's perfect for outdoor enthusiasts and relaxation seekers.",
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
        description: "Live among the treetops in this unique treehouse escape. Watch birds, read, or stargaze from your private canopy bed.",
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
        description: "Fish, kayak, or just relax by the lake. This cozy cottage provides the perfect lakeside retreat for nature lovers.",
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
        description: "Experience the Rockies in this rustic lodge. Hike by day, unwind in the hot tub by night, and savor the mountain life.",
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
        description: "Stay in a beautifully restored 19th-century townhouse. Walk to historic sites, dine at local gems, and soak in the historic charm.",
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
        description: "Wake up to ocean waves in this beachfront bungalow. Relax on your private terrace and sip cocktails with sunset views.",
        price: 240
      },
      {
        ownerId: 1,
        address: '8000 a street',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Serene Seaside Getaway",
        description: "Escape to a tranquil seaside haven. Wake up to the soothing sound of waves, enjoy sweeping ocean views from your private terrace, and stroll down to your secluded beach for a day of sun and surf,",
        price: 240
      },
      {
        ownerId: 1,
        address: '7000 a street',
        city: 'Stubenville',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Chic Urban Loft Retreat",
        description: "Immerse yourself in vibrant city life in this spacious loft. Modern design meets comfort, and a rooftop garden offers a serene escape from the bustling streets below. Explore local art, cuisine, and culture just steps from your door.",
        price: 240
      },
      {
        ownerId: 1,
        address: '6000 a street',
        city: 'Pittsburgh',
        state: 'Pennsylvania',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Rustic Mountain Cabin",
        description: "Reconnect with nature in this cozy cabin surrounded by majestic mountains. Hike scenic trails, cozy up by the fireplace, and savor the tranquility of the wilderness. A perfect retreat for outdoor enthusiasts.",
        price: 240
      },
      {
        ownerId: 1,
        address: '5000 a street',
        city: 'Paris',
        state: 'Pennsylvania',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Vintage Charm Cottage",
        description: "Experience the allure of a bygone era in this charming cottage. Antiques and cozy furnishings create a warm and inviting atmosphere. Relax by the crackling fireplace or take a stroll through the garden for a delightful escape.",
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
