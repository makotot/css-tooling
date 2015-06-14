module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    browserSync: 'grunt-browser-sync'
  });
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    path: {
      src: './src',
      dev: './dev'
    },

    eslint: {
      target: ['./Gruntfile.js']
    },

    clean: {
      all: ['<%= path.dev %>']
    },

    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: ['<%= path.src %>/partials/*.hbs'],
        helpers: [
          'handlebars-helper-prettify'
        ]
      },
      all: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.hbs',
            dest: '<%= path.dev %>'
          }
        ]
      }
    },

    sass: {
      options: {
        sourceMap: true
      },
      all: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss',
            src: '*.scss',
            dest: '<%= path.dev %>/css',
            ext: '.css'
          }
        ]
      }
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: ['<%= path.src %>/**/*.hbs'],
        tasks: ['assemble']
      },
      css: {
        files: ['<%= path.src %>/scss/**/*.scss'],
        tasks: ['sass']
      }
    },

    browserSync: {
      all: {
        options: {
          watchTask: true,
          server: {
            baseDir: '<%= path.dev %>'
          }
        },
        bsFiles: {
          src: [
            '<%= path.dev %>/**/*.html',
            '<%= path.dev %>/css/*.css'
          ]
        }
      }
    }

  });


  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('serve', ['clean', 'assemble', 'sass', 'browserSync', 'watch']);
};

