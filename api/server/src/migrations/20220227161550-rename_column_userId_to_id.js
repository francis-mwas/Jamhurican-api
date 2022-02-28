'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    //Add altering commands here.
    await queryInterface.renameColumn('users', 'userId', 'id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropColumn('users', 'id');
  },
};
