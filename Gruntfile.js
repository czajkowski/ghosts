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
                    "dist/index.html": "build/index.html"
                }
            }
        },

        uglify: {
            dist: {
                src: [
                    "build/<%= pkg.name %>.js"
                ],
                dest: "dist/<%= pkg.name %>.js"
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    "dist/style.css": "build/style.css"
                }
            }
        },

        copy: {
            "build-html": {
                src: "src/index.html",
                dest: "build/index.html"
            },
            "build-css": {
                src: "src/css/style.css",
                dest: "build/style.css"
            }
        },

        concat: {
            options: {
                // separator: ";",
            },
            "build-js": {
                src: [
                    "src/js/helpers.js",
                    "src/js/pathfinder.js",
                    "src/js/character.js",
                    "src/js/cakeman.js",
                    "src/js/ghost.js",
                    "src/js/board.js",
                    "src/js/controller.js",
                    "src/js/index.js",
                ],
                dest: "build/<%= pkg.name %>.js",
            },
        },

        watch: {
            js: {
                files: ["src/js/*.js"],
                tasks: [
                    "concat:build-js",
                    "uglify",
                    "compress:dist"
                ],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ["src/css/*.css"],
                tasks: [
                    "copy:build-css",
                    "cssmin",
                    "compress:dist"
                ],
                options: {
                    spawn: false,
                }
            },
            html: {
                files: ["src/index.html"],
                tasks: [
                    "copy:build-html",
                    "htmlmin",
                    "compress:dist"
                ],
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
            dist: {
                options: {
                    archive: "dist/<%= pkg.name %>.zip",
                    pretty: true
                },
                src: [
                    "dist/index.html",
                    "dist/ghosts.js",
                    "dist/style.css"
                ]
            }
        }
    });


    grunt.registerTask("server", [
        "connect"
    ]);

    grunt.registerTask("build", [
        "copy:build-html",
        "copy:build-css",
        "concat:build-js"
    ]);

    grunt.registerTask("dist", [
        "build",
        "htmlmin",
        "uglify",
        "cssmin",
        "compress"
    ]);

    grunt.registerTask("develop", [
        "dist",
        "server",
        "watch"
    ]);

    grunt.registerTask("default", [
        "develop"
    ]);

};
