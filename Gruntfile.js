'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').concat(['gruntacular']).forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app:  'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {
  }

  grunt.initConfig({
    yeoman:        yeomanConfig,
    watch:         {
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/css/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
        ],
        tasks: ['livereload']
      }
    },
    connect:       {
      livereload: {
        options: {
          port:       9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname:   'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test:       {
        options: {
          port:       9000,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open:          {
      server: {
        url: 'http://localhost:<%= connect.livereload.options.port %>/#/'
      }
    },
    clean:         {
      dist:   ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint:        {
      options: {
        jshintrc: '.jshintrc'
      },
      all:     [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    testacular:    {
      all:  {
        configFile: 'testacular.conf.js',
        singleRun:  true
      },
      unit: {
        configFile: 'testacular.unit.conf.js',
        singleRun:  false,
        autoWatch:  true
      }
    },
    typescript:    {
      base: {
        src:     ['<%= yeoman.app %>/scripts/{,*/}*.ts'],
        //dest: 'where/you/want/your/js/files',
        options: {
          module:      'amd', //or commonjs
          target:      'es5', //or es3
          //base_path: 'path/to/typescript/files',
          sourcemap:   true,
          declaration: true
        }
      },
      test: {
        src:     ['test/spec/{,*/}*.ts', 'test/e2e/{,*/}*.ts'],
        //dest: 'where/you/want/your/js/files',
        options: {
          module:      'amd', //or commonjs
          target:      'es5', //or es3
          //base_path: 'path/to/typescript/files',
          sourcemap:   true,
          declaration: true
        }
      }
    },
    less:          {
      production: {
        options: {
          paths: ["<%= yeoman.app %>/components/bootstrap/less"]
        },
        files:   {
          "<%= yeoman.app %>/css/style.css": "<%= yeoman.app %>/less/style.less"
        }
      }
    },
    concat:        {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/*.js',
            '<%= yeoman.app %>/scripts/*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html:    '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin:        {
      html:    ['<%= yeoman.dist %>/{,*/}*.html'],
      css:     ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin:      {
      dist: {
        files: [
          {
            expand: true,
            cwd:    '<%= yeoman.app %>/images',
            src:    '{,*/}*.{png,jpg,jpeg}',
            dest:   '<%= yeoman.dist %>/images'
          }
        ]
      }
    },
    cssmin:        {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/main.css': [
            '.tmp/css/{,*/}*.css',
            '<%= yeoman.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin:       {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
           // https://github.com/yeoman/grunt-usemin/issues/44
           //collapseWhitespace: true,
           collapseBooleanAttributes: true,
           removeAttributeQuotes: true,
           removeRedundantAttributes: true,
           useShortDoctype: true,
           removeEmptyAttributes: true,
           removeOptionalTags: true*/
        },
        files:   [
          {
            expand: true,
            cwd:    '<%= yeoman.app %>',
            src:    ['*.html', 'views/*.html'],
            dest:   '<%= yeoman.dist %>'
          }
        ]
      }
    },
    cdnify:        {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin:         {
      dist: {
        files: [
          {
            expand: true,
            cwd:    '<%= yeoman.dist %>/scripts',
            src:    '*.js',
            dest:   '<%= yeoman.dist %>/scripts'
          }
        ]
      }
    },
    uglify:        {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ],
        }
      }
    },
    copy:          {
      dist: {
        files: [
          {
            expand: true,
            dot:    true,
            cwd:    '<%= yeoman.app %>',
            dest:   '<%= yeoman.dist %>',
            src:    [
              '*.{ico,txt}',
              '.htaccess',
              'components/**/*',
              'images/{,*/}*.{gif,webp}'
            ]
          }
        ]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', [
    //'clean:server',
    //'less',
    //'typescript',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'less',
    'typescript',
    'connect:test',
    'testacular:all'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'test',
    'useminPrepare',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy',
    'cdnify',
    'usemin',
    'ngmin',
    'uglify'
  ]);

  grunt.task.registerTask('apiary2js', 'Generate js version of apiary file.', function () {
    var parser = require('apiary-blueprint-parser');
    var content = grunt.file.read('apiary.apib');
    var blueprint = parser.parse(content);
    var json = JSON.stringify(blueprint.sections, null, 2);
    grunt.file.write('app/apiary.js', "var apiary = " + json);
  });

  //grunt.registerTask('default', ['build']);
};
