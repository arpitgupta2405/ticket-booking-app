/**
 * `tasks/config/htmlmin`
 *
 * ---------------------------------------------------------------
 *
 *
 *
 * For more information, see:
 *   https://sailsjs.com/anatomy/tasks/config/hash.js
 *
 */
module.exports = function(grunt) {

  grunt.config.set('htmlmin', {
    dist: {
      options: {
        collapseWhitespace: true
      },
      files: [
        {expand: true, cwd: 'views/', src: ['**/*.ejs'], dest: 'views/'},
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //
  //  ```
  //  $ npm install grunt-contrib-htmlmin --save-dev --save-exact
  //  ```
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

};
