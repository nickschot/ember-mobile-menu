'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
            '@ember/jquery': '^1.1.0',
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe({
        npm: {
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      }),
      embroiderOptimized({
        npm: {
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      }),
    ],
  };
};
