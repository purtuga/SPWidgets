
module.exports = function(grunt) {

    "use strict";

    // If we don't yet have a user's build file, create it.
    if (!grunt.file.isFile('me.build.json')) {

        grunt.file.write('me.build.json',
            JSON.stringify({
                buildLocation: 'BUILD',
                deployLocation: ''
            }, null, 4)
        );
        grunt.fail.fatal("me.build.json file is needed! \n" +
            "One was just created from template. You should Edit it now." );
        return;

    }

    var userOpt     = grunt.file.readJSON('me.build.json'),
        pkgSetup    = grunt.file.readJSON('package.json'),
        buildDate   = grunt.template.today('yyyy-mm-dd'),
        buildYear   = grunt.template.today('yyyy'),
        buildId     = (new Date()).getTime(),
        fs          = require('fs'),
        path        = require('path'),
        minifyHtml  = require("./tools/copy.process.minifyHtml.js").minifyHtml;


    /**
     * includeFile() - embeds a file content within another. Meant to be
     * used from the copy task as a 'processContent' function. The following
     * tokens can be used in files: <br>
     *
     *  -   BUILD_INCLUDE('file')
     *  -   /* BUILD_INCLUDE('file') *\x47
     *  -   &lt;!-- BUILD_INCLUDE("file") --&gt;
     *
     * In addition, options can be added to the token above that further
     * process the file being included:
     *
     *  -   BUILD_INCLUDE('file')[option1,option2,option3]
     *
     * Supported options:
     *
     *  -   asJsString : Escapes all double-quotes and new line characters
     *                   in the file
     *
     * @param {String} fileContent
     * @param {String} filePath
     *
     * @return {String} fileContent
     *
     * @see https://gist.github.com/purtuga/85ee689f0d3d90484ce3
     *
     * @example
     *
     *  ...
     *  copy: {
     *      options: {
     *          expand: true,
     *          process: includeFile
     *      }
     *  }
     *  ...
     *
     */
    function includeFile(fileContent, filePath){

        if (fileContent.indexOf("BUILD_INCLUDE") > -1) {

            grunt.log.write("includeFile(): [" + filePath + "] has BUILD_INCLUDE: ");

            // Match:
            //      // BUILD_INCLUDE('file')
            //      /* BUILD_INCLUDE('file') */
            //      <!-- BUILD_INCLUDE("file") -->
            //
            //  Token OPtions:
            //      // BUILD_INCLUDE('file')[options,here,as,array]
            //
            //      asJsString
            //
            var re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)) {0,}BUILD_INCLUDE\(['"](.*)['"]\)(?:\[(.*)\])?(?: {0,}(?:\-\-\>)| {0,}(?:\*\/))?/i,
                match, file, fileIncludeOptions;

            while ((match = re.exec(fileContent)) !== null) {

                grunt.log.write(".");
                grunt.verbose.writeln("    Match array: " + match );

                file = grunt.template.process( match[1] );

                grunt.verbose.writeln("    File to embed: " + file );

                file = grunt.file.read( file );

                // If options were set, then parse them
                if (match[2]) {

                    fileIncludeOptions = match[2].split(',');

                    // If option: asJsString
                    if (
                        fileIncludeOptions.some(function(option){
                            return String(option).toLowerCase() === "asjsstring";
                        })
                    ) {

                        file = file
                                .replace(/\"/g, '\\x22')
                                .replace(/\'/g, '\\x27')
                                .replace(/\r\n|\n/g, "\\n");

                    }


                }

                fileContent = fileContent.replace(match[0], function(){ return file; });

            }
            grunt.log.writeln("");
            return fileContent;

        }

        return fileContent;

    } //end: includeFile()

    /**
     * Repaces build variables in files with actual values. Meant to be used
     * with the 'copy' task as a contentProcess function
     *
     * @param {String} fileContent
     * @param {String} srcPath
     *
     * @return {String}
     */
    function replaceBuildVariables(fileContent, srcPath){

        grunt.verbose.writeln("replaceBuildVariables(): Processing : " + srcPath );

        return fileContent
            .replace( /@BUILD/g, buildId)
            .replace( /@VERSION/g, grunt.template.process("<%= pkg.version %>"))
            .replace( /@DATE/g, buildDate )
            .replace( /@YEAR/g, buildYear )
            .replace( /@AUTHOR/g, grunt.template.process("<%= pkg.author %>") );

    } //end: replaceBuildVariables()

    /**
     * Returns a function that can be used with grunt's copy
     * task 'filter' option. Checks if file being copied
     * is newer than that destination file.
     *
     * @param {Object} target
     *      The config object from copy task.
     * @param {String} timestampFile
     *      A timestamp file. Will be used instead of accessing the
     *      destination file when detemining if file should be copied.
     *
     * @return {Boolean}
     *      True - yes, its new
     *      false - no, its not new
     *
     * @see {https://github.com/gruntjs/grunt-contrib-copy/issues/78#issuecomment-19027806}
     *
     */
    function onlyNew(target, timestampFile) {

        if (!onlyNew.isTaskCreated) {

            onlyNew.isTaskCreated = true;

            grunt.registerTask('onlyNewPostRun', function(){

                var file = Array.prototype.slice.call(arguments, 0).join(':');

                grunt.log.writeln("onlyNewPostRun Task RUNNING for file: " + file);
                fs.writeFileSync(file, 'temp file');

            });

            onlyNew.timestampFiles = {};

        }


        // Return the callback function for each file check - used in the task
        return function(src) {

            var dest    = grunt.config(target.concat('dest')),
                cwd     = grunt.config(target.concat('cwd')),
                dstat, stat, response;

            if (!timestampFile) {

                dest = cwd ?
                       path.join(dest, path.relative(cwd, src)) :
                       path.join(dest, src);

            } else {

                dest = timestampFile;

            }

            if (timestampFile && !onlyNew.timestampFiles[timestampFile]) {

                onlyNew.timestampFiles[timestampFile] = true;

                grunt.task.run("onlyNewPostRun:" + timestampFile);

            }

            // grunt.log.writeln("this.target: " + this.name);

            grunt.verbose.writeln("Src  File: " + src);
            grunt.verbose.writeln("Dest File: " + dest);

            try {

                dstat   = fs.statSync(dest);
                stat    = fs.statSync(src);

            } catch (e) {

                // grunt.log.writeln("    Unable to get stat data... Returning True");

                return true;

            }

            // grunt.log.writeln("    Src  is File: " + stat.isFile() + " | mTime: " + stat.mtime.getTime());
            // grunt.log.writeln("    Dest is File: " + dstat.isFile() + " | mTime: " + dstat.mtime.getTime());

            // grunt.log.writeln("mod[" + dstat.mtime.getTime() + "]: " + dest);

            response = ( stat.isFile() && stat.mtime.getTime() > dstat.mtime.getTime() );

            // grunt.log.writeln("    Response: " + response);

            return response;

        };

    } //end: onlyNew()


    // ----------------
    // Validations
    // ----------------
    if (!userOpt.buildLocation) {
        grunt.fail.fatal("me.build.json: missing buildLocation value!" );
        return;
    }

    // Expand any templates in buildLocation... Uses custom data for expansion.
    userOpt.buildLocation = grunt.template.process(
        userOpt.buildLocation,
        {
            data: {
                ENV: process.env
            }
        }
    );

    // If build folder does not exist, error.
    if (!grunt.file.exists(userOpt.buildLocation) ||
        !grunt.file.isDir(userOpt.buildLocation)
    ) {
        grunt.fail.fatal("me.build.json: buildLocation [" +
            userOpt.buildLocation + "] does not exist or not a directory!" );
        return;
    }

    // If the build folder is the same as this directory, error.
    if (grunt.file.isPathCwd(userOpt.buildLocation)) {
        grunt.fail.fatal("me.build.json: buildLocation cannot be current directory (cwd)!" );
        return;
    }

    // Task configuration.
    grunt.initConfig({

        pkg: pkgSetup,

        ENV: process.env,

        userOpt: userOpt,

        buildFolder: "<%= userOpt.buildLocation %>/<%= pkg.name %>",

        banner : '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> | <%= pkg.license  %> | ' +
            'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
            '<%= pkg.homepage ? " | " + pkg.homepage : "" %> */\n',
        // Task configuration.
        clean : {
            options: {
                force: true
            },
            stage : [
                '<%= buildFolder %>'
            ],
            build: [
                '<%= buildFolder %>/demo/src/*.aspx',
                '<%= buildFolder %>/documentation/ALL.md'
            ]
        },
        concat : {
            options : {
                banner : '<%= banner %>',
                stripBanners : true
            },
            // PROD: insert the banner into the requireJS compiled file
            prod : {
                src : [
                    '<%= requirejs.compile.options.out %>'
                ],
                dest : '<%= requirejs.compile.options.out %>'
            },
            demo: {
                options : {
                    stripBanners : false
                },
                files: {
                    '<%= buildFolder %>/demo.widgets.js': [
                        '<%= buildFolder %>/demo/src/widget.*.demo.js'
                    ],
                    '<%= buildFolder %>/demo.vendor.js': [
                        'vendor/jquery/dist/jquery.min.js',
                        'vendor/jquery-ui/jquery-ui.min.js',
                        '<%= buildFolder %>/demo/src/ext/vkBeautify.js',
                        '<%= buildFolder %>/dist/jquery.<%= pkg.name %>.js',
                        '<%= buildFolder %>/demo/src/demo.common.js'
                    ]
                }
            },

            docs: {
                options : {
                    banner : ''
                },
                files: {
                    "<%= buildFolder %>/documentation/ALL.md": [
                        '<%= buildFolder %>/documentation/SPWidgets.md',
                        '<%= buildFolder %>/documentation/SPWidgets.*.md'

                    ]
                }
            }
        },
        copy: {
            options: {
                processContentExclude: [
                    '**/*.{png,gif,jpg,ico,psd}'
                ]
            },
            build: {
                options: {
                    processContentExclude: [
                        '**/*.{png,gif,jpg,ico,psd}',
                        'demo/src/Demo.SPWidgets.aspx'
                    ],
                    processContent: function(fileContent, filePath){
                        return replaceBuildVariables(
                                    includeFile(
                                        minifyHtml(fileContent, filePath),
                                        filePath
                                    ),
                                    filePath
                                );
                    }
                },
                expand: true,
                filter: onlyNew(['copy', 'build']),
                dest: "<%= buildFolder %>",
                src: [
                    "demo/**/*",
                    "src/**/*",
                    "test/**/*",
                    "documentation/**/*",
                    "vendor/jquery/dist/jquery.js",
                    "vendor/jquery-ui/jquery-ui.js",
                    "vendor/require-less/*.js",
                    "vendor/requirejs/require.js",
                    "vendor/requirejs-text/text.js"
                ]
            },
            deploy: {
                options : {
                    processContentExclude: [ '**/*.*' ]
                },
                cwd: "<%= buildFolder %>",
                src:    [
                    "src/**/*",
                    "vendor/**/*",
                    "demo/**/*",
                    "test/**/*",
                    'dist/jquery.<%= pkg.name %>.js',
                    'dist/jquery.<%= pkg.name %>.min.js'
                ],
                dest:   "<%= userOpt.deployLocation %>",
                expand: true,
                filter: onlyNew(
                    ['copy', 'deploy'],
                    // file includes deploy location name
                    path.join(
                        userOpt.buildLocation,
                        pkgSetup.name,
                        "deploy.timestamp--" + userOpt.deployLocation.replace(/\W/g, "") + ".txt"
                    )
                )
            },
            prod: {
                expand: true,
                cwd: '<%= buildFolder %>/dist/',
                src: [
                    'jquery.<%= pkg.name %>.js',
                    'jquery.<%= pkg.name %>.min.js',
                    'jquery.<%= pkg.name %>.min.js.map'
                ],
                dest: "dist/"
            },
            prodFixScriptTags: {
                options: {
                    processContent: function(fileData/*, srcPath*/){
                        return fileData.replace(/<\/script>/ig,'\\x3c/script>');
                    }
                },
                cwd: '<%= buildFolder %>/dist/',
                files: {
                    '<%= buildFolder %>/dist/jquery.<%= pkg.name %>.js': [
                        '<%= buildFolder %>/dist/jquery.<%= pkg.name %>.js'
                    ],
                    '<%= buildFolder %>/dist/jquery.<%= pkg.name %>.min.js': [
                        '<%= buildFolder %>/dist/jquery.<%= pkg.name %>.min.js'
                    ]
                }
            },
            demo: {
                options: {
                    processContentExclude: [
                        '**/*.{png,gif,jpg,ico,psd}'
                    ],
                    processContent: function(fileContent, filePath){
                        return replaceBuildVariables(
                                    includeFile(fileContent, filePath),
                                    filePath
                                );
                    }
                },
                expand: true,
                cwd: "<%= buildFolder %>/demo/src/",
                src: 'Demo.SPWidgets.aspx',
                dest: 'demo/'
            }
        },
        uglify : {
            options : {
                banner : '<%= banner %>',
                sourceMap: true
            },
            prod : {
                src : '<%= requirejs.compile.options.out %>',
                dest : '<%= buildFolder %>/dist/jquery.<%= pkg.name %>.min.js'
            },
        },
        qunit : {
            files : ['test/**/*.html']
        },
        jshint : {
            options : {
                jshintrc : true,
                ignores: [
                    "test/setup/jasmine-boot.js"
                ]
            },
            gruntfile : {
                src : 'Gruntfile.js'
            },
            src : {
                src : ['src/**/*.js', 'demo/src/*.js']
            },
            test : {
                src : ['test/**/*.js']
            }
        },

        watch : {
            gruntfile : {
                files : '<%= jshint.gruntfile.src %>',
                tasks : ['jshint:gruntfile']
            },
            src : {
                files : [
                    'src/**/*',
                    'demo/**/*',
                    'test/**/*',
                    '*.aspx'
                ],
                tasks : ['deploy']
            },
            test : {
                files : '<%= jshint.test.src %>',
                tasks : ['jshint:test', 'test']
            },
        },

        requirejs: {

            compile: {
                options: {
                    baseUrl: "<%= buildFolder %>/",
                    paths: {
                        jquery:                 'vendor/jquery/dist/jquery',
                        'jquery-ui':            'vendor/jquery-ui/jquery-ui',
                        less:                   'vendor/require-less/less',
                        lessc:                  'vendor/require-less/lessc',
                        'less-builder':         'vendor/require-less/less-builder',
                        normalize:              'vendor/require-less/normalize',
                        text:                   'vendor/requirejs-text/text'
                    },
                    shim: {
                        'jquery-ui': {
                            deps: ['jquery']
                        },
                        'SPWidgets': {
                            deps: ['jquery', 'jquery-ui']
                        }
                    },
                    less: {
                        relativeUrls: true
                    },
                    exclude: [
                        "less", "text", "normalize", "less-builder", "jquery", "jquery-ui"
                    ],
                    optimize: "none",
                    wrap: {
                        // AMD loader code
                        start: ';(function(factory){\n' +
                                '    if ( typeof define === "function" && define.amd ) {\n' +
                                    '        define([ "jquery" ], factory );\n' +
                                '    } else {\n' +
                                    '        factory( jQuery );' +
                                '    }' +
                            '}(function(jquery) {\n',
                        end: '}));'
                    },
                    done: function(done, output) {
                        var duplicates = require('rjs-build-analysis').duplicates(output);

                        if (Object.keys(duplicates).length > 0) {
                            grunt.log.subhead('Duplicates found in requirejs build:');
                            for (var key in duplicates) {
                                grunt.log.error(duplicates[key] + ": " + key);
                            }
                            return done(new Error('r.js built duplicate modules, please check the excludes option.'));
                        } else {
                            grunt.log.success("No duplicates found!");
                        }

                        done();
                    },
                    onModuleBundleComplete: function (data) {
                        var fs = require('fs'),
                            amdclean = require('amdclean'),
                            outputFile = data.path;

                            // Make a copy of the requireJS optmized file
                            fs.writeFileSync(
                                outputFile + ".compiled.js",
                                fs.readFileSync(outputFile)
                            );

                            fs.writeFileSync(outputFile, amdclean.clean({
                                'filePath': outputFile,
                                'ignoreModules': ["jquery", "jquery-ui"],
                                transformAMDChecks: false

                            }));
                    },
                    name: "src/SPWidgets",
                    out: "<%= buildFolder %>/dist/jquery.<%= pkg.name %>.js"
                }


            } // end: requirejs:compile

        }, //end: requirejs

        connect: {
            test: {
                options: {
                    port: 8182
                }
            }
        },
        jasmine: {
            all: {
                options: {
                    specs:      "test/specs/**/*.js",
                    host:       "http://127.0.0.1:8182/",
                    template:   require('grunt-template-jasmine-requirejs'),
                    helpers:    ["vendor/jasmine-ajax/lib/mock-ajax.js"],
                    templateOptions: {
                        requireConfigFile: "test/setup/requirejs.config.js",
                        requireConfig: {
                            baseUrl: "./"
                        }
                    }

                }
            }
        }

    }); //end: config()

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');

    /**
     * Default TASK
     * Run build
     */
    grunt.registerTask('default', ['build']);

    /**
     * BUILD
     * Builds the appliation.
     */
    grunt.registerTask('build', "jshint, test, build.", function(){

        grunt.log.writeln("BUILD ID: " + buildId);
        grunt.log.writeln("BUILD DIR: " + grunt.config(["copy", "build", "dest"]));
        grunt.log.writeln("DEPLOY LOCATION: " + grunt.config(['userOpt', 'deployLocation']));

        grunt.task.run([
            "jshint",
            "test",
            "clean:build",
            "copy:build"
        ]);

    }); //end: target: build

    grunt.registerTask('build-prod', [
        "build",
        "requirejs",
        "uglify:prod",
        "concat:prod",
        "copy:prodFixScriptTags",
        "copy:prod",
        "concat:demo",
        "copy:demo",
        "concat:docs"
    ]);

    /**
     * Deploy task
     * Will use the my.build.json settings to
     * copy content from the build folder to the deploy destination.
     *
     */
    grunt.registerTask('deploy', ["build", "copy:deploy"]);

    grunt.registerTask('test', ["connect:test", "jasmine"]);

}; //end: module.exports
