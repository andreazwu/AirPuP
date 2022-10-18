'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://a0.muscache.com/im/pictures/7be81de9-1676-4b05-a141-f3af7034dba8.jpg?im_w=720'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/f51d2a7b-cec0-43ae-87c2-274ab08188da.jpg?im_w=720'
      },
      {
        reviewId: 2,
        url: 'https://a0.muscache.com/im/pictures/704caa1a-2f31-41b8-8b0e-bdd07a2f12c4.jpg?im_w=720'
      },
      {
        reviewId: 3,
        url: 'https://a0.muscache.com/im/pictures/0f7dfdda-ffd9-4ee1-aa4c-51db0f3e1110.jpg?im_w=720'
      },
    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   const Op = Sequelize.Op
  //   await queryInterface.bulkDelete('ReviewImages', {
  //     id: { [Op.in]: [1, 2, 3] }
  //   }, {});
  // }
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
