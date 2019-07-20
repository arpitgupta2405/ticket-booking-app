/**
 * TheatreSeatTimeMapping.js
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
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    totalSeats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    seatsBooked: {
      type: Sequelize.INTEGER
    }
  },
  options: {
    freezeTableName: true,
    tableName: 'theatre_seat_time_mapping',
    timestamps: false,
    instanceMethods: {},
    hooks: {},
    scopes: {},
    connection: 'default',
    classMethods: {
      addMapping: async function(opts) {
        return this.create(opts);
      },

      updateSeatsByTheatreId: async function(opts) {
        return this.update({
          totalSeats: opts.seat
        }, {
          where: {
            theatreId: opts.id
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

      getAvailableSeatByTheatreIdAndTime: async function(opts) {
        return this.findOne({
            where: {
              theatreId: opts.theatreId,
              time: opts.showTime
            }
          })
          .then((result) => {
            return (result.totalSeats - result.seatsBooked);
          });
      },

      updateBookedSeats: async function(opts) {
        return this.findOne({
            attributes: ['seatsBooked'],
            where: {
              theatreId: opts.theatreId,
              time: opts.showTime
            }
          })
          .then((result) => {
            return this.update({
              seatsBooked: result.seatsBooked + opts.numOfSeats
            }, {
              where: {
                theatreId: opts.theatreId,
                time: opts.showTime
              }
            });
          });
      }
    },
  },
  associations: function() {}

};
