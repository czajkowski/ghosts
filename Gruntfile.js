/*globals module*/

module.exports = function(grunt) {
    "use strict";

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-connect");

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
                    "build/style.min.css": "src/css/style.css"
                }
            }
        },

        uglify: {
            build: {
                src: [
                    "src/js/index.js",
                    "src/js/pacman.js"
                ],
                dest: "build/<%= pkg.name %>.min.js"
            }
        },

        connect: {
            server: {
              options: {
                port: 8000,
                base: "build",
                keepalive: true
              }
            }
        }
    });


    grunt.registerTask("server", [
        "connect"
    ]);

    grunt.registerTask("build", [
        "htmlmin",
        "cssmin",
        "uglify"
    ]);


    grunt.registerTask("default", [
        "build",
        "server"
    ]);

};
