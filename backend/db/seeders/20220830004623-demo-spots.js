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
        state: "SG",
        country: "Italy",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Nature's Heartbeat",
        description: "The Chalet is part of Sreng, which for centuries has been handed down from generation to generation. The house, immersed in the green meadows of the Dolomites, has all the comforts. We offer the breakfast basket.",
        price: 294
      },
      {
        ownerId: 7,
        address: "666 Lornado Lane",
        city: "Gaspard",
        state: "Alpes",
        country: "France",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Casa vacanze Pra di Brëc",
        description: "Pra di Brëc is our dream that became true. We have restructured our grandparents’ home and we would like to offer you an experience characterized by simplicity and hospitality.",
        price: 185
      },
      {
        ownerId: 1,
        address: "777 Ashen Lane",
        city: "Abyss",
        state: "Alpes",
        country: "France",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Chalet Lake Lodge",
        description: "Our Chalet is in front of the lake, with stunning views of the glacier and Grande Motte. You have access to the garden, with sauna, hot tub and bbq. You have direct access to the lakeside, where you will find summer activities.",
        price: 430
      },
      {
        ownerId: 8,
        address: "888 Faerghus Lane",
        city: "Fhirdiad",
        state: "Wallis",
        country: "Switzerland",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Beautiful Chalet with Mountain View",
        description: "The chalet les granges has an exceptional setting with a panoramic view of the entire Mont-Blanc range. A feeling of being alone in the world. It has all the facilities to ensure you have an exceptional stay.",
        price: 1400
      },
      {
        ownerId: 3,
        address: "999 Fraldarius Lane",
        city: "Faerghus",
        state: "DM",
        country: "Switzerland",
        lat: 41.7645357,
        lng: -126.4730328,
        name: "Mountain Chalet",
        description: "It's a house. It's in the mountains. It's a nice place to train. I have a dog. I love dogs. You should come here with your dog.",
        price: 70
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};
