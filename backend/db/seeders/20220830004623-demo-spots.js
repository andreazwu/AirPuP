'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "123 BlueLions Lane",
        city: "Blue Lions",
        state: "WI",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Modern Mountain Retreat - Hot Tub & Stellar Views!",
        description: "This beautiful house has everything you need for a serene escape! Boasting unrestricted views, a deck built with sunset meals in mind, and proximity to local adventure, this Black Mountain home invites you to relax and explore with ease. ",
        price: 439
      },
      {
        ownerId: 2,
        address: "456 Duscur Rd",
        city: "Duscur",
        state: "ON",
        country: "Canada",
        lat: 38.7645351,
        lng: -123.4730322,
        name: "Outpost Luxury Treehouse",
        description: "The Outpost Treehouse has been a lifelong dream and labor of love, handcrafted with reclaimed timber and vintage salvaged finds by husband and wife design team Dimi and Dedue Molinaro. Perfect for get aways.",
        price: 189
      },
      {
        ownerId: 1,
        address: "333 Eagles Blvd",
        city: "Black Eagles",
        state: "IL",
        country: "United States",
        lat: 39.7645353,
        lng: -124.4730324,
        name: "Forest Haven - Otium",
        description: "As you descend the stairway into the woods you'll begin to experience the peace of Otium. The inside is designed with the colors and textures of nature, furnished with luxury linens and all the comforts of home!",
        price: 1850
      },
      {
        ownerId: 1,
        address: "444 Golden Deer",
        city: "Mayfield",
        state: "GD",
        country: "United Kingdom",
        lat: 40.7645355,
        lng: -125.4730326,
        name: "Picture-perfect Dome",
        description: "Clad in aromatic cedar wood, beautifully furnished - ideal private, woodland retreat for couples. A wonderful place to chill-out and lose yourself - you won't want to leave! ",
        price: 281

      },
      {
        ownerId: 4,
        address: "555 Gautier Lane",
        city: "Sreng",
        state: "RU",
        country: "Italy",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Nature's Heartbeat",
        description: "The Chalet is part of Sreng, which for centuries has been handed down from generation to generation. The house, immersed in the green meadows of the Dolomites, has all the comforts. We offer the breakfast basket.",
        price: 294
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
