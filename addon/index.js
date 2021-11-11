'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },

  included() {
    let app = this._findHost();
    if (!app.__emberMobileMenuIncludedInvoked) {
      app.__emberMobileMenuIncludedInvoked = true;

      this._super.included.apply(this, arguments);

      let hasSass = !!app.registry.availablePlugins['ember-cli-sass'];

      // Don't include the precompiled css file if the user uses a supported CSS preprocessor
      if (!hasSass) {
        app.import('vendor/ember-mobile-menu.css');
      }
    }
  },
};
