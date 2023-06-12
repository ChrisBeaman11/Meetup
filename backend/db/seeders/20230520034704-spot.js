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
        name: "school",
        description: "A place where people learn",
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
        name: "App Academy",
        description: "A place that developers are created",
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
        name: "home",
        description: "The place that is home",
        price: 127
      },
      {
        ownerId: 2,
        address: '4500 that lane',
        city: 'Weirton',
        state: 'West Virginia',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "home",
        description: "The place that is home",
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
        name: "Home",
        description: "The place that is home",
        price: 127
      },
      {
        ownerId: 3,
        address: '2000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Home",
        description: "The place that is home",
        price: 127
      },
      {
        ownerId: 3,
        address: '3000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Home",
        description: "The place that is home",
        price: 127
      },
      {
        ownerId: 3,
        address: '4000 a road',
        city: 'Athens',
        state: 'Ohio',
        country: "United States",
        lat: 32.7645358,
        lng: -126.4730327,
        name: "Home",
        description: "The place that is home",
        price: 127
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
