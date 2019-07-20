/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /* ############# HOME PAGE ROUTE ############# */
  'GET /': 'HomePageController.show',

  'GET /login': 'HomePageController.login',
  'GET /get-category-by-type': 'CategoryPageController.getCategoriesByType',
  'GET /get-category-details': 'CategoryPageController.getCategoryDetail',
  'GET /check-availability': 'CategoryPageController.checkAvailability',
  'POST /book-ticket': 'CategoryPageController.bookTicket',

  /* ############# USER ROUTES ############# */
  'POST /user/login': 'AuthController.login',
  'POST /user/signup': 'AuthController.signUp',
  'POST /user/logout': 'AuthController.logout',

  /* ############# ADMIN ROUTES ############# */

  'GET /admin': 'AdminController.showLoginPage',
  'POST /admin/login': 'AdminController.login',
  'GET /admin/work': 'AdminController.showWorkPage',
  'POST /admin/logout': 'AdminController.logout',
  '/admin/view-all-theatres': 'AdminController.showAllTheatres',
  '/admin/view-all-movies': 'AdminController.showAllCategories',
  'POST /admin/add-new-theatre': 'AdminController.addNewTheatre',
  'POST /admin/add-new-movie': 'AdminController.addNewMovie',
  '/admin/edit-theatre-detail/:theatreId(\\d+)': 'AdminController.editTheatreDetail',
  '/admin/edit-category-detail/:categoryId(\\d+)': 'AdminController.editCategoryDetail',
  'PUT /admin/update-theatre-detail': 'AdminController.updateTheatreDetail',
  'PUT /admin/update-category-detail': 'AdminController.updateCategoryDetail',
  'PUT /admin/delete-category': 'AdminController.deleteCategory',
  'PUT /admin/delete-theatre': 'AdminController.deleteTheatre',

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝

};
