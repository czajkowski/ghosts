/*globals module, require*/

module.exports = function(grunt) {
    "use strict";

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    "build/index.html": "src/index.html"
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    "build/style.css": "src/css/style.css"
                }
            }
        },

        uglify: {
            build: {
                src: [
                    "src/js/index.js",
                    "src/js/pacman.js"
                ],
                dest: "build/<%= pkg.name %>.js"
            }
        },

        watch: {
            js: {
                files: ["src/js/*.js"],
                tasks: ["uglify", "compress"],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ["src/css/*.css"],
                tasks: ["cssmin", "compress"],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ["src/index.html"],
                tasks: ["htmlmin", "compress"],
                options: {
                    spawn: false,
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: "build"
                }
            }
        },

        compress: {
            main: {
                options: {
                    archive: "build/<%= pkg.name %>.zip",
                    pretty: true
                },
                src: [
                    "build/index.html",
                    "build/ghosts.js",
                    "build/style.css"
                ]
            }
        }
    });


    grunt.registerTask("server", [
        "connect"
    ]);

    grunt.registerTask("build", [
        "htmlmin",
        "cssmin",
        "uglify",
        "compress"
    ]);

    grunt.registerTask("develop", [
        "build",
        "server",
        "watch"
    ]);

    grunt.registerTask("default", [
        "develop"
    ]);

};
