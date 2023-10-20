'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-source': '~4.4.0',
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-source': '~4.8.0',
          },
          dependenciesMeta: {
            'ember-mobile-menu': {
              injected: true,
            },
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
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
