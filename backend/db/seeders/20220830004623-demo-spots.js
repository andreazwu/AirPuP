'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 BlueLions Lane",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Fhirdiad",
        description: "Spot #1",
        price: 188
      },
      {
        ownerId: 2,
        address: "456 Garreg Rd",
        city: "New York",
        state: "NY",
        country: "United States",
        lat: 38.7645351,
        lng: -123.4730322,
        name: "Faerghus",
        description: "Spot #2",
        price: 204
      },
      {
        ownerId: 1,
        address: "333 Eagles Blvd",
        city: "Milwaukee",
        state: "WI",
        country: "United States",
        lat: 39.7645353,
        lng: -124.4730324,
        name: "Sreng",
        description: "Spot #3",
        price: 120
      },
      {
        ownerId: 1,
        address: "444 Golden Deer",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        lat: 40.7645355,
        lng: -125.4730326,
        name: "Riegan",
        description: "Spot #4",
        price: 65
      },
      {
        ownerId: 2,
        address: "555 Ashen Lane",
        city: "Seattle",
        state: "WA",
        country: "United States",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Abyss",
        description: "Spot #5",
        price: 178
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
