'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-addon-docs': {
      documentingAddonAt: '../ember-mobile-menu',
    },
    '@embroider/macros': {
      setConfig: {
        'ember-mobile-menu': {
          theme: 'android'
        }
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/docs`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  return app.toTree();
};
