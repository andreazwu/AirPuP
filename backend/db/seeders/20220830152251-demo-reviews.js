'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: "Honeymoon with husband, had a great time",
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: "No AC",
        stars: 3
      },
      {
        spotId: 2,
        userId: 1,
        review: "Best host ever",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "Good place to relax",
        stars: 4
      },
      {
        spotId: 2,
        userId: 4,
        review: "Food was delicious",
        stars: 5
      },
      {
        spotId: 4,
        userId: 3,
        review: "There was a creepy doll, I'm pretty sure it's cursed",
        stars: 1
      },
      {
        spotId: 3,
        userId: 4,
        review: "It's a trap",
        stars: 1
      },
      {
        spotId: 1,
        userId: 3,
        review: "Best vacation ever",
        stars: 5
      }
    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   const Op = Sequelize.Op
  //   await queryInterface.bulkDelete('Reviews', {
  //     id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] }
  //   }, {});
  // }
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
