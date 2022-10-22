"use strict";
const { Op } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/f7cf22e6-70cf-4d95-b6bf-08ece00d7c04.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/2515c324-89a0-4fcd-9085-666b292a4e3d.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/e3a0e0fc-7ad9-41b3-8e2d-dd43e6583ddf.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/efaf24a7-c34e-47e3-9b0c-a07a5749fc0d.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-48281951/original/e94c04af-0e03-4b0c-ab4e-824af49fb814.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/51beb74c-2d23-4da2-af5b-14dd8bb7b98e.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/a60a635e-82a1-484f-ab28-0c3e4918c9d1.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/d2fc30fc-08e1-433a-b6a8-73b647ae2e23.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/e2822011-6755-455a-9370-187be37ae091.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/caccfa66-9cd8-48ff-9d59-d93768f374ce.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/18986897-702f-416d-958e-9627e6c9f72b.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/10c0b70b-6617-4ec5-bc1a-3065e35b3f16.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/8dbe1bba-5315-4ba9-91b5-f860f9810bc6.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/9804749d-2561-4dc9-8868-83f0c52dc0bc.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/8a005205-af39-47b4-a8a4-590c8f8faf0b.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/aea8e8e8-ea18-4feb-82db-63e6612e8654.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/84073452/e3b5ad60_original.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/ddb1938e-3693-48f5-8ebf-d402fa6b77f2.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/0203e86e-dee5-442f-baba-f6c99babcaba.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/325dcc46-9df5-4578-a84d-d87ae2d53e85.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/eac961a6-bb9d-437a-bdd9-821c14cc30b1.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/df105537-ef34-4b1b-8aee-eb87a8e8394c.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/36056540-bc70-455b-8440-c2b29a0777df.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/f6af40e3-2fb6-481d-8604-14befde727e7.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41635833/original/c1121122-16c9-43b5-80a1-44988f1dbb1e.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50848424/original/f199c35c-5555-4981-a62a-9cdd849d74b9.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50848424/original/7fa535c3-dc01-41c6-b37e-d4cbc546241f.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50848424/original/6fc91d79-db5d-4f1e-8675-b8ed232ffd1e.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50848424/original/9bd1ba08-0df7-4a8c-a91e-3aaebf5ca051.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-50848424/original/8077247d-e804-49c3-90d0-95efe1e4a3cb.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/83322329-cada-4a6e-ad16-196522989bec.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/bbf1fb2b-8f4f-4b7a-9b97-57cd2e2316eb.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/4e49f09d-7558-4198-9464-cbb32de3a553.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/45d27fac-b8e4-40a0-96e7-3bf710aa343e.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/4bcbafbe-cf98-47d7-b324-d91cef53ba97.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/5250c7bd-65b4-42f0-a567-7c5a9223c026.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/81c6bb11-7cda-45e4-9133-0a2ab5ac9120.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/28710ab8-6023-4bc3-8210-0afdfb6fd8d6.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/8cf3944e-e317-4ef7-af1e-14c265b7811b.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/0f8338f7-dc92-4b2f-8864-a1e94f6e11cf.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/e51ad9eb-16ea-4790-bfab-9398888452c0.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/830492f9-45b7-4b72-9c8c-8f969f06dd04.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/3e9ce336-0896-4670-a0f0-036ca5791df8.jpg?im_w=720",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/ef52256b-4dbe-46a2-9f3c-7f93d7dfcd26.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/ddd624c0-cdea-4554-adf3-a3a1630d5de4.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/6b7b75ab-0bb0-4435-b87d-43197b0216a3.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/044ab2d6-8163-42b3-b315-eafd722acfaf.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/dbad66a2-cbff-4388-96ef-55c51ae5799c.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/86286d8f-6356-4c48-b62f-03a92850f12b.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/a47716bc-49ac-4677-bdf4-882810cd2e08.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/8865ab0d-df8f-413d-91d4-1177ca45845c.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/d19c9351-d767-4641-ba98-f2c756a4f58e.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/754dafdd-bc93-4b47-a70c-5be3211587f1.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/93f50802-1f13-41db-980c-48de413032b4.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/a4645f47-24f4-4ca1-a423-171fb60fdb22.jpg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-44482282/original/a0f2b5eb-e9bf-4309-a6c7-a2528d074ff7.jpeg?im_w=1200",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-44482282/original/34c1aa6d-b87f-4af0-8f23-224db3d3b3db.jpeg?im_w=720",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-44482282/original/476b9d1e-ede6-4706-a929-658d63c93afb.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/46ec6f51-dd64-4612-8af7-76bb64d1e83a.jpg?im_w=1200",
        preview: false
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/7ed70c15-dba8-4554-a686-263ca15425e7.jpg?im_w=720",
        preview: false
      },

    ]);
  },

  // async down(queryInterface, Sequelize) {
  //   const Op = Sequelize.Op
  //   await queryInterface.bulkDelete("SpotImages", {
  //     id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
  //   }, {});
  // }
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpotImages", null, {});
  }
};
