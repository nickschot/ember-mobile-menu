'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { compatBuild } = require('@embroider/compat');

const needsOwnerPolyfill = process.env.NEEDS_OWNER_POLYFILL === 'true';

console.log(`Needs owner polyfill? ${needsOwnerPolyfill}`);

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-mobile-menu'],
    },
  });

  return compatBuild(app, buildOnce);
};
