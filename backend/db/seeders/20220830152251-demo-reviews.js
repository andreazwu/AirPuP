'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: "Had a lovely honeymoon with my husband. It truly was a spectacular view from the balcony deck. Close to town but remote enough to enjoy nature and beautiful views.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: "Very Spacious. Our friends loved the cabin as well and the ambience.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 7,
        review: "I had a lovely time!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: "The host is absolutely AMAZING. Look at these beautiful flowers he prepared for us!!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "Brought my dog. He was so excited he chewed the sofa.",
        stars: 4
      },
      {
        spotId: 2,
        userId: 6,
        review: "Treehouse was quaint, cute, warm, and clean. The host was responsive. I would recommend it!!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: "It's a trap.",
        stars: 1
      },
      {
        spotId: 3,
        userId: 4,
        review: "It might be haunted... Also the shower is freezing cold!!",
        stars: 2
      },
      {
        spotId: 4,
        userId: 2,
        review: "Very peaceful.",
        stars: 5
      },
      {
        spotId: 4,
        userId: 8,
        review: "I want to like it, but the bed is way too small to fit me and my partner :(",
        stars: 4
      },
      {
        spotId: 5,
        userId: 6,
        review: "This place is so beautiful, it makes me wanna sing!! The hills are alive~~ with the sound of muuuusic~~~",
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: "Sylvain was an excellent host! The house is a dream, everything you need is available. The location is great for exploring the region and in particular to unwind. A clear recommendation and we will certainly come back!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "Too isolated. No place to find food.",
        stars: 2
      },
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
