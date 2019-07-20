/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment');

module.exports = {
  showLoginPage: async function(req, res) {
    let model;

    model = {};
    await BaseController.assignCommons(req, res, model);
    model.firstfold = 'home';
    res.locals.layout = 'layouts/adminLayout';
    if (req.session && req.session.adminId) {
      return res.redirect('/admin/work');
    }
    return res.view('admin/login', model);
  },

  showWorkPage: async function(req, res) {
    let model;

    model = {};
    await BaseController.assignCommons(req, res, model);
    model.firstfold = 'home';
    res.locals.layout = 'layouts/adminLayout';
    return res.view('admin/work', model);
  },

  login: async function(req, res) {
    let userData;

    userData = {};

    userData.adminEmail = req.body.userEmail;
    userData.password = req.body.password;

    return AdminUsers.validateCredentials(userData)
      .then((response) => {
        if (response.success) {
          req.session.adminId = response.adminId;
          req.session.adminEmail = response.adminEmail;
          req.session.adminName = response.adminName;
          return res.status(200).json({
            success: true,
            message: 'Login Successful',
            redirectPath: '/admin/work'
          });
        } else {
          return res.status(401).json({
            success: false,
            message: 'Not an admin'
          });
        }
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  logout: async function(req, res) {
    await req.session.destroy();

    let data = {
      success: true,
      message: 'User logged out successfully.',
      redirectPath: '/admin'
    };

    return res.status(200).json(data);
  },

  showAllTheatres: async function(req, res) {
    let model;
    let opts;
    let perPage;
    let currentpage;

    model = {};
    opts = {}
    perPage = 5;
    currentpage = Number(((req.query && req.query.page) || (req.body && req.body.page) || 1));
    opts.offset = currentpage ? (currentpage - 1) * perPage : 0;
    opts.limit = perPage;
    await BaseController.assignCommons(req, res, model);

    return Theatre.getAllTheatres(opts)
      .then((theatres) => {
        model.theatres = JSON.parse(JSON.stringify(theatres.rows));
        model.count = theatres.count;
        model.currentpage = currentpage;
        model.searchString = opts.searchString;
        model.totalpages = Math.ceil(model.count / perPage);
        model.firstfold = 'home';
        res.locals.layout = 'layouts/adminLayout';
        return res.view('admin/show-all-theatres', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  showAllCategories: async function(req, res) {
    let model;

    model = {};
    await BaseController.assignCommons(req, res, model);
    await BaseController.getAllTheater(req, res, model);

    return Category.getAllCategories()
      .then((categories) => {
        model.categories = JSON.parse(JSON.stringify(categories));
        model.firstfold = 'home';
        res.locals.layout = 'layouts/adminLayout';
        return res.view('admin/show-all-categories', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  addNewTheatre: async function(req, res) {
    let opts;
    let promises;
    let data;
    let times;

    promises = [];
    data = {};
    times = ['9:00 AM', "01:00 PM", "5:00 PM", "9:00 PM"];

    opts = {
      name: req.body.name,
      seat: req.body.seat,
      cost: req.body.cost,
      status: req.body.status
    };

    return Theatre.addNewTheatre(opts)
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        for (let i = 0; i < times.length; i++) {
          data.theatreId = result.id;
          data.time = times[i];
          data.totalSeats = result.seat;
          promises.push(TheatreSeatTimeMapping.addMapping(data));
        }
        return Promise.all(promises);
      })
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Theatre Added'
        });
      })
      .catch(err => {
        sails.log.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({
            success: false,
            message: 'Duplicate Name'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  addNewMovie: async function(req, res) {
    let opts;

    opts = {
      name: req.body.name,
      duration: moment.utc(req.body.duration * 60 * 1000).format('HH:mm:ss'),
      type: req.body.type,
      status: req.body.status,
      times: "9:00 AM,01:00 PM,5:00 PM,9:00 PM",
      theatreId: req.body.theatreId
    };

    return Category.addNewMovie(opts)
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        opts.categoryId = result.id;
        return TheatreCategoryMapping.addMapping(opts);
      })
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Theatre Added'
        });
      })
      .catch(err => {
        sails.log.error(err);
        if (err.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({
            success: false,
            message: 'Duplicate Name'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  editTheatreDetail: async function(req, res) {
    let theatreId = req.params.theatreId;
    let model = {};

    await BaseController.assignCommons(req, res, model);

    return Theatre.getTheatreById(theatreId)
      .then((theatre) => {
        model.theatre = JSON.parse(JSON.stringify(theatre));
        model.firstfold = 'home';
        res.locals.layout = 'layouts/adminLayout';
        return res.view('admin/edit-theatre-details', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  updateTheatreDetail: async function(req, res) {
    let opts;

    opts = {
      id: req.body.id,
      name: req.body.name,
      seat: req.body.seat,
      cost: req.body.cost,
      status: req.body.status
    };

    return Theatre.updateTheatreDetail(opts)
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        return TheatreSeatTimeMapping.updateSeatsByTheatreId(opts);
      })
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Updated'
        });
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  editCategoryDetail: async function(req, res) {
    let categoryId = req.params.categoryId;
    let model = {};

    await BaseController.assignCommons(req, res, model);
    await BaseController.getAllTheater(req, res, model);

    return Category.getCategoryById(categoryId)
      .then((category) => {
        model.category = JSON.parse(JSON.stringify(category));
        return TheatreCategoryMapping.getMappingByCategoryId(category.id);
      })
      .then((result) => {
        model.category.theatreId = result.theatreId;
        model.firstfold = 'home';
        res.locals.layout = 'layouts/adminLayout';
        return res.view('admin/edit-category-details', model);
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  updateCategoryDetail: async function(req, res) {
    let opts;

    opts = {
      id: req.body.id,
      name: req.body.name,
      duration: moment.utc(req.body.duration * 60 * 1000).format('HH:mm:ss'),
      type: req.body.type,
      status: req.body.status,
      times: "9:00 AM,01:00 PM,5:00 PM,9:00 PM",
      theatreId: req.body.theatreId
    };

    return Category.updateCategoryDetail(opts)
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        return TheatreCategoryMapping.updateMappingByCategoryId(opts);
      })
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            success: false,
            message: 'Error Occurred'
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Updated'
        });
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  deleteTheatre: function(req, res) {
    let theatreId;

    theatreId = req.body.theatreId;
    return TheatreCategoryMapping.getMappingByTheatreId(theatreId)
      .then((result) => {
        if (result && result.categoryId) {
          return Category.updateStatus(result.categoryId, 0);
        } else {
          return null
        }
      })
      .then((result) => {
        return TheatreCategoryMapping.deleteMappingByTheatreId(theatreId)
      })
      .then((result) => {
        return TheatreSeatTimeMapping.deleteMappingByTheatreId(theatreId);
      })
      .then((result) => {
        return Theatre.deleteTheatreById(theatreId);
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Theatre Deleted'
        });
      })
      .catch(err => {
        sails.log.error(err);
        return res.status(400).json({
          success: false,
          message: 'Bad Request'
        });
      });
  },

  deleteCategory: function(req, res) {
    let categoryId;

    categoryId = req.body.categoryId;

    return TheatreCategoryMapping.deleteMappingByCategoryId(categoryId)
      .then(() => {
        return Category.deleteCategoryById(categoryId);
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Category Deleted'
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
