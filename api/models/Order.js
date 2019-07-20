/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    theatreId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    showType: Sequelize.ENUM('MOVIE', 'EVENT'),
    showTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bookingId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    numOfSeats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    totalCost: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdTime: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedTime: {
      allowNull: false,
      type: 'TIMESTAMP'
    }
  },
  options: {
    freezeTableName: true,
    tableName: 'order',
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    instanceMethods: {},
    hooks: {},
    scopes: {},
    connection: 'default',
    classMethods: {
      createNewOrder: async function(opts) {
        return this.create(opts);
      },
    },
  },
  associations: function() {}

};
