'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.createTable('client', {
        client_id: { type: DataTypes.STRING(32), primaryKey: true, unique: true },
        customer_id: { type: DataTypes.STRING(21), required: true },
        client_secret: { type: DataTypes.STRING(64), required: true },
        name: { type: DataTypes.STRING(100), required: true },
        redirect_uri: { type: DataTypes.STRING(256), required: true },
        public_key: { type: DataTypes.STRING(513), required: true },
        disabled: { type: DataTypes.BOOLEAN, required: false, defaultValue: false },
        created_at: { type: DataTypes.DATE, required: true },
        updated_at: { type: DataTypes.DATE, allowNull: true },
        deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
      }, { transaction });

      await queryInterface.addIndex('client', ['client_id'], { name: 'client_ndx_client', unique: true, transaction });
      await queryInterface.addIndex('client', ['customer_id'], { name: 'client_ndx_customer', unique: false, transaction });

      await queryInterface.createTable('authorize', {
        code: { type: DataTypes.STRING(64), primaryKey: true, unique: true },
        customer_id: { type: DataTypes.STRING(21), required: true },
        client_id: { type: DataTypes.STRING(32), required: true },
        exp: { type: DataTypes.BIGINT, required: true },
        iat: { type: DataTypes.BIGINT, required: true },
        isconsumed: { type: DataTypes.BOOLEAN, required: false, defaultValue: false },
        consume_date: { type: DataTypes.BIGINT, required: true },
        scope: { type: DataTypes.STRING(256), required: true },
        created_at: { type: DataTypes.DATE, required: true },
        updated_at: { type: DataTypes.DATE, allowNull: true },
        deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
      }, { transaction });

      await queryInterface.addIndex('authorize', ['customer_id', 'client_id'], { name: 'authorizecode_ndx_custclient', unique: false, transaction });

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.dropTable('client');
      await queryInterface.dropTable('authorize');

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
}
