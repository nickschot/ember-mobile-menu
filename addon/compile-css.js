'use strict';

const sass = require('sass'); // eslint-disable-line node/no-unpublished-require
const fs = require('fs');
const path = require('path');

const inputFile = path.join(
  __dirname,
  'app',
  'styles',
  'ember-mobile-menu.scss',
);
const outputFile = path.join(__dirname, 'vendor', 'ember-mobile-menu.css');

// Compile main file
var result = sass.renderSync({
  data: fs.readFileSync(inputFile, 'utf8'),
  includePaths: ['app/styles'],
});

fs.writeFileSync(outputFile, result.css);
