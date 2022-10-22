'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: "Had a lovely honeymoon with my husband. The view from the balcony deck was spectacular.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 7,
        review: "Very Spacious. It was close to town but remote enough to enjoy nature and beautiful views.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 4,
        review: "I almost drowned in the hot tub...",
        stars: 2
      },
      {
        spotId: 2,
        userId: 5,
        review: "The host was absolutely AMAZING. Look at these beautiful flowers he prepared for us!!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 6,
        review: "Treehouse was quaint, cute, warm, and clean. The host was responsive. I would recommend it!!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "Brought my dog. He was so excited he chewed the sofa.",
        stars: 4
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
        review: "I really wanted to like it, but the bed was way too small to fit me and my partner comfortably. I wouldn't come back again :(",
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
        review: "Sylvain was an excellent host! The house is a dream, everything you need is available. We will certainly come back.",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "Too isolated. No place to find food.",
        stars: 3
      },
      {
        spotId: 6,
        userId: 5,
        review: "The unit was perfect! It was just what we were looking, peace and quiet and a stunning view.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: "Lovely stay. Host's cooking is delicious.",
        stars: 5
      },
      {
        spotId: 6,
        userId: 3,
        review: "There are boars in the mountains.",
        stars: 1
      },
      {
        spotId: 7,
        userId: 2,
        review: "Absolutely gorgeous view.",
        stars: 5
      },
      {
        spotId: 7,
        userId: 8,
        review: "Lots of wildlife around here!",
        stars: 4
      },
      {
        spotId: 7,
        userId: 3,
        review: "My dog and I swam in the lake. He also befriended the bear statue.",
        stars: 4
      },
      {
        spotId: 8,
        userId: 6,
        review: "There's a creepy doll in the bedroom. It's probably haunted.",
        stars: 1
      },
      {
        spotId: 8,
        userId: 4,
        review: "The view and the design is spectacular. One of our top 10!!",
        stars: 5
      },
      {
        spotId: 1,
        userId: 5,
        review: "A really fantastic place to stay! Very well furnished and incredibly relaxing atmosphere.",
        stars: 5
      },
      {
        spotId: 1,
        userId: 6,
        review: "Simply amazing! Just a perfect retreat. Everything is as perfect, highes quality and well designed as on the pics.",
        stars: 5
      },
      {
        spotId: 9,
        userId: 4,
        review: "The host was kinda mean. He tried to spar with me and hit me pretty hard with his sword. His dog was really cute though, and the view was gorgeous!!",
        stars: 3
      },
      {
        spotId: 9,
        userId: 6,
        review: "The host was funny. We had a karaoke night with his dog!!",
        stars: 4
      },
      {
        spotId: 11,
        userId: 7,
        review: "The best accomodation so far in norway. I can view the northern light for 2 nights in a row!!",
        stars: 5
      },
      {
        spotId: 11,
        userId: 6,
        review: "It is a great spot for aurora watching - we got to see it on our first night directly from the house!! ",
        stars: 5
      },
      {
        spotId: 11,
        userId: 8,
        review: "We built our trip around this stay and spent an immensely beautiful, not to say magical time there. We will be back.",
        stars: 5
      },
      {
        spotId: 11,
        userId: 1,
        review: "Our stay was magical and way beyond any expectations we had. We enjoyed seeing the northern lights from the hot tub!!",
        stars: 4
      },
      {
        spotId: 8,
        userId: 1,
        review: "The place was nice but it was also OUTRAGEOUSLY expensive! ",
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
