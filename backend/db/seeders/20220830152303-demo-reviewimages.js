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
      {
        reviewId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50848424/original/77b843dd-46c9-4e0e-a500-831918d988d7.jpeg?im_w=720"
      },
      {
        reviewId: 17,
        url: "https://a0.muscache.com/im/pictures/93748888-1df6-4ee6-a980-7924a7655bf2.jpg?im_w=720"
      },
      {
        reviewId: 17,
        url: "https://a0.muscache.com/im/pictures/8eacedc3-a627-41e0-aea1-e67375821355.jpg?im_w=1200"
      },
      {
        reviewId: 18,
        url: "https://a0.muscache.com/im/pictures/fff2d5c3-37ba-4854-abfc-bc7cb389fbcb.jpg?im_w=720"
      },
      {
        reviewId: 20,
        url: "https://a0.muscache.com/im/pictures/b357103d-02ad-415b-8aa5-f613780128d8.jpg?im_w=1200"
      },
      {
        reviewId: 21,
        url: "https://a0.muscache.com/im/pictures/43b5fa19-d67a-43e9-8555-0a5251343257.jpg?im_w=1200"
      },
      {
        reviewId: 21,
        url: "https://a0.muscache.com/im/pictures/0cb403aa-5f97-441a-b3bf-2f9e24a84af1.jpg?im_w=720"
      },
      {
        reviewId: 24,
        url: "https://a0.muscache.com/im/pictures/2d166888-8d9c-434a-8e2e-72bb6b08e154.jpg?im_w=1200"
      },
      {
        reviewId: 24,
        url: "https://a0.muscache.com/im/pictures/238e26a8-3ced-4d67-9c86-b84a4a08b917.jpg?im_w=720"
      },
      {
        reviewId: 26,
        url: "https://a0.muscache.com/im/pictures/cbfe3fa3-6cec-48f3-98d0-18ab8e96717d.jpg?im_w=720"
      },
      {
        reviewId: 27,
        url: "https://a0.muscache.com/im/pictures/0866a630-104d-4647-a918-76e9a5f8f90b.jpg?im_w=720"
      },
      {
        reviewId: 28,
        url: "https://a0.muscache.com/im/pictures/38b06bfd-203b-41a7-b2b0-b9c4b8829005.jpg?im_w=720"
      },
      {
        reviewId: 28,
        url: "https://a0.muscache.com/im/pictures/e6264062-251a-404b-ba49-41670d798774.jpg?im_w=720"
      },
      {
        reviewId: 29,
        url: "https://a0.muscache.com/im/pictures/c575ed41-4a37-44e6-a35e-1e57bd932a29.jpg?im_w=720"
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
