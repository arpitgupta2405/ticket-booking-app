/**
 * `tasks/config/less`
 *
 * ---------------------------------------------------------------
 *
 * Compile your LESS files into a CSS stylesheet.
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/less.js
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sass', {
    options: {
      implementation: require('node-sass'),
      fiber: require('fibers'),
      sourceMap: true
    },

    dev: {
      files: [{
        expand: true,
        cwd: 'assets/styles/',
        src: ['newft-styles.scss'],
        dest: '.tmp/public/styles/',
        ext: '.css'
      }, {
        expand: true,
        cwd: 'assets/styles/firstfold/',
        src: ['*.scss'],
        dest: 'views/firstfold/',
        ext: '.css'
      }]
    }
  });

  grunt.loadNpmTasks('node-sass');
  grunt.loadNpmTasks('grunt-sass');

};
