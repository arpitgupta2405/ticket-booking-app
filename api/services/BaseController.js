/**
 * BaseController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  assignBasic: async function(req, res, model) {

    model.baseUrl = sails.config.custom.baseUrl;
    model.environment = sails.config.environment;
    // model.userType = (req.session && typeof req.session.userType !== 'undefined') ? req.session.userType : undefined;
    // model.userEmail = (req.session && typeof req.session.userEmail !== 'undefined') ? req.session.userEmail : undefined;
    // model.userId = (req.session && typeof req.session.userId !== 'undefined') ? req.session.userId : undefined;
    if (req.session && typeof req.session !== 'undefined') {
      req.session.downloadPath = undefined;
      req.session.popupFromMail = undefined;
      req.session.paymentredirection = undefined;
      delete req.session.paymentredirection;
    }
  },

  assignCommons: async function(req, res, model) {

    await this.assignBasic(req, res, model);
  },

  getAllTheater: async function(req, res, model) {
    let theatre = await Theatre.getAllActiveTheatres();
    model.theatre = JSON.parse(JSON.stringify(theatre));
  },

};
