'use strict';
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://www.travelandleisure.com/thmb/EJsgQGKWAMy7bUvmylWBAomRNiY=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/torres-del-paine-national-park-chile-MOSTBEAUTIFUL0921-4dfe4d2e67aa4f28ace7cf7cd21f4c8c.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.travelandleisure.com/thmb/pYt8_bhj-4Xgw-P3vgYAgGQQEys=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bagan-myanmar-MOSTBEAUTIFUL0921-7de032dd5a894dbc970896d65fc0283b.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.travelandleisure.com/thmb/jO1PHwf1UlWKY2cqIRLrAAOS1xc=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/monteverde-cloud-forest-biological-reserve-costa-rica-MOSTBEAUTIFUL0921-12355ee5f2344bbbbe826e68511eb795.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.travelandleisure.com/thmb/qi6wB0Mz8dEn3zOM4C6G5khK-ik=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/anse-source-dargent-seychelles-MOSTBEAUTIFUL0921-6086f0b731944230a748d0f1fec13acf.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.travelandleisure.com/thmb/dRfRdcIfr-UIPTBf2MoMEqgI9ow=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/grand-canyon-arizona-MOSTBEAUTIFUL0921-60bb5a40dbfe4e4b8c28175074cd07dc.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53680271/original/e0edb6f7-f9ab-4126-a54a-5a3acc05c638.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53680271/original/580effb6-4ce9-4807-835f-901c4c14fb56.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53680271/original/f4b337ca-a8f0-4b02-be0d-3b2fd3a39691.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53680271/original/c4f2da8c-9837-4b77-82a4-4452129fd280.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-53680271/original/097aea4b-4be8-404b-8f4f-ae30e37fd16d.jpeg?im_w=480",
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.travelandleisure.com/thmb/pdNXF2o_JwuPA_NcrQwfVbOxYEo=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/whitehaven-beach-australia-MOSTBEAUTIFUL0921-7176edab28054ad78be76714bd071a2e.jpg',
        preview: true
      },
    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   const Op = Sequelize.Op
  //   await queryInterface.bulkDelete('SpotImages', {
  //     id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
  //   }, {});
  // }
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
