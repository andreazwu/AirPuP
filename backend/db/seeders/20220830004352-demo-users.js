"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Andrea",
        lastName: "Wu",
        email: "demo@user.io",
        username: "Andrea Wu",
        hashedPassword: bcrypt.hashSync("password1")
      },
      {
        firstName: "Dedue",
        lastName: "Molinaro",
        email: "user2@user.io",
        username: "Dedue",
        hashedPassword: bcrypt.hashSync("dimidue")
      },
      {
        firstName: "Felix",
        lastName: "Fraldarius",
        email: "user3@user.io",
        username: "Felix",
        hashedPassword: bcrypt.hashSync("dimidue")
      },
      {
        firstName: "Sylvain",
        lastName: "Gautier",
        email: "user4@user.io",
        username: "Sylvain",
        hashedPassword: bcrypt.hashSync("dimidue")
      },
      {
        firstName: "Mercedes",
        lastName: "Martritz",
        email: "user5@user.io",
        username: "Mercedes",
        hashedPassword: bcrypt.hashSync("dimidue")
      },
      {
        firstName: "Annette",
        lastName: "Dominic",
        email: "user6@user.io",
        username: "Annette",
        hashedPassword: bcrypt.hashSync("dimidue")
      },
      {
        firstName: "Ashe",
        lastName: "Ubert",
        email: "user7@user.io",
        username: "Ashe",
        hashedPassword: bcrypt.hashSync("dimidue")
      },
      {
        firstName: "Dimitri",
        lastName: "Blaiddyd",
        email: "user8@user.io",
        username: "Dimitri",
        hashedPassword: bcrypt.hashSync("dimidue")
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    return queryInterface.bulkDelete("Users",
      // {
      //   username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] }
      // },
      null,
      // { truncate: true, restartIdentity: true },
      {});
  }
};
