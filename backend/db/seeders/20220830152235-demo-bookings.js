'use strict';
const { Op } = require("sequelize");

// helper function:
const formatDate = (date) => new Date(Date.parse(date)).toISOString().split('T')[0];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: formatDate('2023-05-05'),
        endDate: formatDate('2023-05-23')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: formatDate('2022-12-20'),
        endDate: formatDate('2022-12-30')
      },
      {
        spotId: 3,
        userId: 4,
        startDate: formatDate('2023-01-11'),
        endDate: formatDate('2023-02-13')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: formatDate('2023-08-11'),
        endDate: formatDate('2023-08-13')
      },
      {
        spotId: 5,
        userId: 2,
        startDate: formatDate('2023-06-07'),
        endDate: formatDate('2023-07-04')
      },
      {
        userId: 3,
        spotId: 2,
        startDate: formatDate('2023-04-03'),
        endDate: formatDate('2023-04-05')
      },
      {
        userId: 2,
        spotId: 1,
        startDate: formatDate('2023-05-01'),
        endDate: formatDate('2023-05-02')
      }
    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   const Op = Sequelize.Op
  //   await queryInterface.bulkDelete('Bookings', {
  //     id: { [Op.in]: [1, 2, 3, 4, 5] }
  //   }, {});
  // }
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
