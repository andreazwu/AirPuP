'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'https://www.travelandleisure.com/thmb/0rXl4LWsLDE5pBJNGbQgT6DpYHs=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/avenue-of-the-baobabs-madagascar-MOSTBEAUTIFUL0921-9018225e787e4539b1294976f7a2baf4.jpg'
      },
      {
        reviewId: 2,
        url: 'https://www.travelandleisure.com/thmb/BA2YOwD5vpe16dx63JX1tTr7hyo=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/salar-de-uyuni-bolivia-MOSTBEAUTIFUL0921-d1c3606335b749d4a5d8e3b2eb8e00d4.jpg'
      },
      {
        reviewId: 2,
        url: 'https://www.travelandleisure.com/thmb/CaAwLVxoe6Z_ytpRHACoVhOevnc=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ha-long-bay-vietnam-MOSTBEAUTIFUL0921-910a3a82a03f4bb59d49290fbdc2a6db.jpg'
      },
      {
        reviewId: 3,
        url: 'https://www.travelandleisure.com/thmb/awAmCqNCN6S8pP2yaMFIx4X9q58=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/lake-atitlan-guatemala-MOSTBEAUTIFUL0921-35f105b0ae6543eabb6869c0003c4d1e.jpg'
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
