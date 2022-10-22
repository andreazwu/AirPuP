"use strict";
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ReviewImages", [
      {
        reviewId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/fc95b5ca-a852-4110-ae41-e56a87009b9f.jpeg?im_w=720"
      },
      {
        reviewId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/fd942c7c-d10e-4aa1-badd-273dbad16476.jpeg?im_w=1200"
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/5cec3c50-e076-4e76-9361-0195ecb3c1e5.jpeg?im_w=1200"
      },
      {
        reviewId: 4,
        url: "https://a0.muscache.com/im/pictures/08017d77-1445-43ce-872c-041e8c43dd93.jpg?im_w=720"
      },
      {
        reviewId: 6,
        url: "https://a0.muscache.com/im/pictures/4bcad6b8-7ba3-4b1a-8013-59ff33c26687.jpg?im_w=720"
      },
      {
        reviewId: 8,
        url: "https://a0.muscache.com/im/pictures/332f67a3-c047-44b1-a5b8-b76cbad18dd0.jpg?im_w=720"
      },
      {
        reviewId: 9,
        url: "https://a0.muscache.com/im/pictures/d793da55-55b5-4422-8c2f-77de3183f497.jpg?im_w=720"
      },
      {
        reviewId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/1a73a0b3-b48a-4c02-adc1-e0149b1926b8.jpeg?im_w=1200"
      },
      {
        reviewId: 11,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/3d34efe5-5317-45c1-afc2-aa7e61c25d70.jpeg?im_w=720"
      },
      {
        reviewId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/c6d37d07-a4bc-447c-b60e-1e1d5a9b2c0e.jpeg?im_w=1200"
      },
    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   const Op = Sequelize.Op
  //   await queryInterface.bulkDelete("ReviewImages", {
  //     id: { [Op.in]: [1, 2, 3] }
  //   }, {});
  // }
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ReviewImages", null, {});
  }
};
