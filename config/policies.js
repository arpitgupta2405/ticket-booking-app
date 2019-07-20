/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  HomePageController: {
    'show': ['is-logged-in']
  },

  CategoryPageController: {
    'getCategoriesByType': ['is-logged-in'],
    'getCategoryDetail': ['is-logged-in'],
    'checkAvailability': ['is-logged-in'],
    'bookTicket': ['is-logged-in'],
  },

  AdminController: {
    'showWorkPage': ['is-admin'],
    'showAllTheatres': ['is-admin'],
    'showAllCategories': ['is-admin'],
    'addNewTheatre': ['is-admin'],
    'addNewMovie': ['is-admin'],
    'editTheatreDetail': ['is-admin'],
    'updateTheatreDetail': ['is-admin'],
    'editCategoryDetail': ['is-admin'],
    'updateCategoryDetail': ['is-admin'],
    'deleteTheatre': ['is-admin'],
    'deleteCategory': ['is-admin']
  },
};
