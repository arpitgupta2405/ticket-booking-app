/**
 * TheatreCategoryMapping.js
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
    theatreId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  options: {
    freezeTableName: true,
    tableName: 'theatre_category_mapping',
    timestamps: false,
    instanceMethods: {},
    hooks: {},
    scopes: {},
    connection: 'default',
    classMethods: {
      addMapping: async function(opts) {
        return this.create(opts);
      },

      getMappingByCategoryId: async function(categoryId) {
        return this.findOne({
          attributes: ['theatreId'],
          where: {
            categoryId: categoryId
          }
        });
      },

      getMappingByTheatreId: async function(theatreId) {
        return this.findOne({
          attributes: ['categoryId'],
          where: {
            theatreId: theatreId
          }
        });
      },

      updateMappingByCategoryId: async function(opts) {
        return this.update({
          theatreId: opts.theatreId
        }, {
          where: {
            categoryId: opts.id
          }
        });
      },

      deleteMappingByTheatreId: async function(theatreId) {
        return this.destroy({
          where: {
            theatreId: theatreId
          }
        })
      },

      deleteMappingByCategoryId: async function(categoryId) {
        return this.destroy({
          where: {
            categoryId: categoryId
          }
        })
      },
    },
  },
  associations: function() {}

};
