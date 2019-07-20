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

  AdminController: {
    'showWorkPage': ['is-admin'],
    'showAllTheatres': ['is-admin'],
    'showAllCategories': ['is-admin'],
    'addNewTheatre': ['is-admin'],
    'addNewMovie': ['is-admin'],
  },
};
