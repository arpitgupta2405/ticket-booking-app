/**
 * Category.js
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
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false
    },
    times: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.TINYINT
    },
    type: Sequelize.ENUM('MOVIE', 'EVENT'),
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
    tableName: 'category',
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    instanceMethods: {},
    hooks: {},
    scopes: {},
    connection: 'default',
    classMethods: {
      getAllCategories: async function() {
        return this.findAll();
      },

      addNewMovie: async function(opts) {
        return this.create(opts);
      },

      getCategoryById: async function(categoryId) {
        return this.findOne({
          where: {
            id: categoryId
          }
        });
      },

      updateCategoryDetail: async function(opts) {
        return this.update({
          name: opts.name,
          duration: opts.duration,
          type: opts.type,
          status: opts.status,
          times: opts.times
        }, {
          where: {
            id: opts.id
          }
        });
      },

      deleteCategoryById: async function(categoryId) {
        return this.destroy({
          where: {
            id: categoryId
          }
        })
      },

      updateStatus: async function(categoryId, status) {
        return this.update({
          status: status
        }, {
          where: {
            id: categoryId
          }
        });
      },

      getActiveCategoryByType: async function(type) {
        return this.findAll({
          where: {
            status: 1,
            type: type
          }
        });
      },
    },
  },
  associations: function() {}

};
