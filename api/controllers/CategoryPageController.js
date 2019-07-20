/**
 * CategoryPageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const generator = require('generate-password');

module.exports = {
  getCategoriesByType: async function(req, res) {
    let type;
    let model;

    model = {};
    type = req.query.type;

    return Category.getActiveCategoryByType(type)
      .then((result) => {
        model.categories = JSON.parse(JSON.stringify(result));
        model.layout = false;
        res.view('partials/category-partial', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  getCategoryDetail: async function(req, res) {
    let categoryId;
    let model;

    model = {};
    categoryId = req.query.categoryId;
    model.category = {};

    return Category.getCategoryById(categoryId)
      .then((result) => {
        model.category = JSON.parse(JSON.stringify(result));
        model.category.times = model.category.times.split(',');
        return TheatreCategoryMapping.getMappingByCategoryId(result.id);
      })
      .then((result) => {
        return Theatre.getTheatreById(result.theatreId);
      })
      .then((result) => {
        model.category.theatre = JSON.parse(JSON.stringify(result));
        model.layout = false;
        res.view('partials/category-partial2', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  checkAvailability: async function(req, res) {
    let opts;
    let model;

    opts = {
      theatreId: Number(req.query.theatreId),
      numOfSeats: Number(req.query.numOfSeats),
      showTime: req.query.show
    };
    model = {};

    if (opts.showTime === '9') {
      opts.showTime = "9:00 AM";
    }
    if (opts.showTime === "13") {
      opts.showTime = "01:00 PM";
    }
    if (opts.showTime === "05:00 PM") {
      opts.showTime = "05:00 PM";
    }
    if (opts.showTime === "9:00 PM") {
      opts.showTime = "9:00 PM";
    }

    return TheatreSeatTimeMapping.getAvailableSeatByTheatreIdAndTime(opts)
      .then((result) => {
        if (result < opts.numOfSeats) {
          return res.status(400).json({
            success: false,
            message: 'Oops Seats not available'
          });
        }
        return Theatre.getCost(opts.theatreId);
      })
      .then((result) => {
        model.totalCost = opts.numOfSeats * result.cost;
        model.showTime = opts.showTime;
        model.numOfSeats = opts.numOfSeats;
        model.layout = false;
        res.view('partials/category-partial3', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  bookTicket: async function(req, res) {
    let opts;

    opts = {
      showType: req.body.type,
      categoryId: Number(req.body.categoryId),
      theatreId: Number(req.body.theatreId),
      numOfSeats: Number(req.body.numOfSeats),
      showTime: req.body.show,
      totalCost: Number(req.body.totalCost)
    };

    opts.bookingId = generator.generate(TokenService.BookingIdOpts());

    opts.userId = req.session.userId;

    if (opts.showTime === '9') {
      opts.showTime = "9:00 AM";
    }
    if (opts.showTime === "13") {
      opts.showTime = "01:00 PM";
    }
    if (opts.showTime === "05:00 PM") {
      opts.showTime = "05:00 PM";
    }
    if (opts.showTime === "9:00 PM") {
      opts.showTime = "9:00 PM";
    }

    return Order.createNewOrder(opts)
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Failed to Book Ticket'
          });
        }
        return TheatreSeatTimeMapping.updateBookedSeats(opts);
      })
      .then((result) => {
        return res.status(200).json({
          success: true,
          message: 'Tickets Booked'
        });
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  }

};
