'use strict';;
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const {
  compatBuild
} = require("@embroider/compat");

module.exports = async function(defaults) {
  const {
    buildOnce
  } = await import("@embroider/vite");

  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-mobile-menu'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return compatBuild(app, buildOnce);
};
