/**
 * Theatre.js
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
    seat: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cost: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.TINYINT
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
    tableName: 'theatre',
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    instanceMethods: {},
    hooks: {},
    scopes: {},
    connection: 'default',
    classMethods: {
      getAllTheatres: async function(qOpts) {
        let opts = {
          limit: qOpts.limit,
          offset: qOpts.offset
        };
        return this.findAndCountAll(opts);
      },

      addNewTheatre: async function(opts) {
        return this.create(opts);
      },

      getTotalSeatsById: async function(theatreId) {
        return this.find({
          attributes: ['seat'],
          where: {
            id: theatreId
          }
        });
      },

      getAllActiveTheatres: async function() {
        return this.findAll({
          where: {
            status: 1
          }
        });
      },

      getTheatreById: async function(theatreId) {
        return this.findOne({
          where: {
            id: theatreId
          }
        });
      },

      updateTheatreDetail: async function(opts) {
        return this.update({
          name: opts.name,
          seat: opts.seat,
          cost: opts.cost,
          status: opts.status
        }, {
          where: {
            id: opts.id
          }
        });
      },

      deleteTheatreById: async function(theatreId) {
        return this.destroy({
          where: {
            id: theatreId
          }
        })
      },

      getCost: async function(theatreId) {
        return this.find({
          attributes: ['cost'],
          where: {
            id: theatreId
          }
        });
      },
    },
  },
  associations: function() {}

};
