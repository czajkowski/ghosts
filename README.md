# ghosts


## Getting started

```shell
npm install
```

```shell
grunt develop
```


## Grunt tasks

### grunt server
Starts dev server.

### grunt build
Copies CSS and HTML files. Concatenates JS files.

### grunt dist
Runs 'grunt build' to copy project files to /build directory.
Minifies HTML, CSS, JS files to /dist directory.
Creates a .zip file in /dist.

### grunt watch
Watches for changes in HTML, CSS and JS files.
When files changr, copies new files to /build directory, minifies them into /dist directory and creates a new .zip archive.

### grunt develop
Runs 'dist', 'server' and 'watch' tasks.


