
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
        path        = require('path');


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
            var re = /(?:(?:\/\/)|(?:<\!\-\-)|(?:\/\*)) {0,}BUILD_INCLUDE\(['"](.*)['"]\)(?:\[(.*)\])?/i,
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

        banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        clean : {
            options: {
                force: true
            },
            stage : [
                '<%= buildFolder %>'
            ],
            build: [
                '<%= buildFolder %>/demo/src/*.aspx'
            ]
        },
        concat : {
            options : {
                banner : '<%= banner %>',
                stripBanners : true
            },
            dist : {
                src : [
                    'src/jquery.<%= pkg.name %>.js',
                    'src/vendor/SPGetListItems.js',
                    'src/vendor/SPUpdateListItems.js'
                ],
                dest : 'dist/jquery.<%= pkg.name %>.js'
            },
        },
        copy: {
            options: {
                processContentExclude: [
                    '**/*.{png,gif,jpg,ico,psd}'
                ]
            },
            build: {
                options: {
                    processContent: function(fileContent, filePath){
                        return replaceBuildVariables(
                                    includeFile(fileContent, filePath),
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
                    "documentation/**/*",
                    "vendor/jquery/dist/jquery.js",
                    "vendor/jquery-ui/jquery-ui.js",
                    "vendor/knockout/dist/knockout.js",
                    "vendor/require-less/less.js",
                    "vendor/require-less/lessc.js",
                    "vendor/require-less/normalize.js",
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
                    "demo/**/*"
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
            }
        },
        uglify : {
            options : {
                banner : '<%= banner %>'
            },
            dist : {
                src : '<%= concat.dist.dest %>',
                dest : 'dist/jquery.<%= pkg.name %>.min.js'
            },
        },
        qunit : {
            files : ['test/**/*.html']
        },
        jshint : {
            options : {
                jshintrc : true
            },
            gruntfile : {
                src : 'Gruntfile.js'
            },
            src : {
                src : ['src/**/*.js', 'demo/src/*.js']
            },
            test : {
                src : ['test/**/*.js']
            },
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
                    '*.aspx'
                ],
                tasks : ['deploy']
            },
            test : {
                files : '<%= jshint.test.src %>',
                tasks : ['jshint:test']
            },
        }

    }); //end: config()

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-jsdoc');

    /**
     * Default TASK
     * Run build
     */
    grunt.registerTask('default', ['build']);

    /**
     * BUILD
     * Builds the appliation.
     */
    grunt.registerTask('build', "Building Project...", function(){

        grunt.log.writeln("BUILD ID: " + buildId);
        grunt.log.writeln("BUILD DIR: " + grunt.config(["copy", "build", "dest"]));
        grunt.log.writeln("DEPLOY LOCATION: " + grunt.config(['userOpt', 'deployLocation']));

        grunt.task.run([
            "jshint",
            "clean:build",
            "copy:build"
        ]);

    }); //end: target: build

    // grunt.registerTask('build-prod', [
        // "clean:prod",
        // "build",
        // "requirejs",
        // "copy:privateVendorLibs",
        // "concat:prod",
        // "uglify:prod",
        // "copy:fixScriptTags",
        // "copy:prod",
        // // Create debug version
        // "copy:nonMinSpa",
        // "copy:fixScriptTags",
        // "copy:prodDebug"
    // ]);
//
    // grunt.registerTask('dist', [
        // "build-prod",
        // "compress:dist",
        // "compress:distDebug"
    // ]);

    /**
     * Deploy task
     * Will use the my.build.json settings to
     * copy content from the build folder to the deploy destination.
     *
     */
    grunt.registerTask('deploy', ["build", "copy:deploy"]);

}; //end: module.exports
