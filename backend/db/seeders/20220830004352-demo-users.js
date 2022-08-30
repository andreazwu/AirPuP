'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: "Dimitri",
        lastName: "Blaiddyd",
        email: 'user11@user.io',
        username: 'Demo-lition1',
        hashedPassword: bcrypt.hashSync('password11')
      },
      {
        firstName: "Dedue",
        lastName: "Molinaro",
        email: 'user22@user.io',
        username: 'FakeUser11',
        hashedPassword: bcrypt.hashSync('password22')
      },
      {
        firstName: "Felix",
        lastName: "Fraldarius",
        email: 'user33@user.io',
        username: 'FakeUser22',
        hashedPassword: bcrypt.hashSync('password33')
      },
      {
        firstName: "Sylvain",
        lastName: "Gautier",
        email: 'user44@user.io',
        username: 'FakeUser33',
        hashedPassword: bcrypt.hashSync('password44')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users',
      // {
      //   username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      // },
      null, {});
  }
};
