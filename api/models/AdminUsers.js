/**
 * AdminUsers.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');
const Op = Sequelize.Op;

module.exports = {

  attributes: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    adminName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    adminEmail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: Sequelize.TINYINT
    },
    userType: Sequelize.ENUM('ADMIN'),
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
    authToken: {
      type: Sequelize.STRING,
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
    tableName: 'admin_users',
    timestamps: true,
    createdAt: 'createdTime',
    updatedAt: 'updatedTime',
    instanceMethods: {
      customToJson: function() {
        return _.omit(this.toJSON(), ['password', 'salt']);
      },
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      setPassword: function(password) {
        this.salt = bcrypt.genSaltSync();
        this.password = bcrypt.hashSync(password, this.salt);
      },
      generateJwt: function() {
        const payload = {
          id: this.id
        };
        return TokenService.issue(payload);
      }
    },
    hooks: {
      beforeCreate: function(user) {
        user.salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, this.salt);
      },
      afterCreate: function(user) {
        const authToken = user.generateJwt();
        User.update({
          authToken
        }, {
          where: {
            id: user.id
          }
        });
      }
    },
    scopes: {},
    connection: 'default',
    classMethods: {
      createUser: async function(opts) {
        opts = _.pick(opts, ['adminName', 'adminEmail', 'password']);

        const qOpts = {
          where: {
            adminEmail: opts.adminEmail
          },
          defaults: opts
        };

        return User.findOrCreate(qOpts)
          .spread((user, created) => {
            user.authToken = user.generateJwt();
            user = _.pick(user, ['id', 'adminName', 'adminEmail', 'authToken']);
            if (created) { // new user
              return {
                success: true,
                message: 'User created successfully!',
                user: user
              };
            } else if (user && user.id) { // already existing user
              return {
                success: false,
                message: 'Email already exists.'
              };
            } else { // invalid query options
              return {
                success: false,
                message: 'Something went wrong!'
              };
            }
          });
      },

      validateCredentials: function(userData) {
        userData = _.pick(userData, ['adminEmail', 'password']);
        const opts = {
          where: {
            adminEmail: userData.adminEmail
          }
        };
        return this.find(opts)
          .then(user => {
            if (user) {
              if (user && user.id && user.validPassword(userData.password)) {
                return {
                  success: true,
                  adminId: user.id,
                  authToken: user.authToken,
                  adminEmail: user.adminEmail,
                  adminName: user.adminName
                };
              } else {
                return {
                  success: false
                };
              }
            } else {
              return {
                success: false
              };
            }
          });
      },
    },
  },
  associations: function() {}

};
