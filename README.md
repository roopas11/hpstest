## IMPORTANT - Deployments

When deploying to non-production environments (UAT / Staging / Pre-production) make sure the `$ENVIRONMENT` environment variable is set to "dev" - default is "production". Setting the environment variable to "dev" is to prevent the site from becoming indexed in Google (the site gets deployed with a meta no index tag).

---------------------------------------------------------------------------------------------

# HPS Brain Gym

The HPS Brain Gym project has been built in [11ty](https://www.11ty.dev), a static website generator.

## Prerequisites

This project use node.js (16+) and npm. You must have both installed on your system or build platform to proceed. 

## Build

Project dependencies need to be installed through NPM using: `npm install`, inside the root folder of the project.

Once installed, you can run `npm run build` or `npx @11ty/eleventy` to build the project, and generate the assets by running the default `gulp` command or `./node_modules/gulp/bin/gulp.js` if gulp is not installed globally. 

```
npm install
npm run build
./node_modules/gulp/bin/gulp.js
```

## Develop

The `src` folder contains all project source files, including all assets and HTML templates. We've used [Nunjucks](https://mozilla.github.io/nunjucks/) as the templating engine, which makes it easier to generate the numerous recipes pages from a single template.

The templates are split between common elements, such as header, footer, etc, which are indicated by an underscore.

At build, 11ty generates all content based on nunjucks templates and puts them into the `dist` folder. Gulp does the same, but for everything within the `assets` folder.

## Commands

Some additional commands to building or running the project:

- **Build:** static build for deployment and testing: `npm run build && ./node_modules/gulp/bin/gulp.js`
- **Develop:** build and watch for changes: `./node_modules/gulp/bin/gulp.js watch`

When running the develop command, BrowserSync is used to automatically refresh the browser when a file is changed or updated. It should open a new browser window automatically, but can be manually opened via http://localhost:3000 
