'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { compatBuild } = require('@embroider/compat');

const needsOwnerPolyfill = process.env.NEEDS_OWNER_POLYFILL === true;

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  let app = new EmberApp(defaults, {
    ...(needsOwnerPolyfill
      ? {
          babel: {
            plugins: [
              [
                require.resolve(
                  'babel-plugin-ember-polyfill-get-and-set-owner-from-ember-owner',
                ),
                {},
              ],
            ],
          },
        }
      : {}),
    autoImport: {
      watchDependencies: ['ember-mobile-menu'],
      ...(needsOwnerPolyfill
        ? {
            webpack: {
              module: {
                rules: [
                  // transforms v2 addon code
                  {
                    test: (filename) => {
                      return filename.endsWith('.js');
                    },
                    use: {
                      loader: 'babel-loader-8',
                      options: {
                        plugins: [
                          require.resolve(
                            'babel-plugin-ember-polyfill-get-and-set-owner-from-ember-owner',
                          ),
                        ],
                      },
                    },
                  },
                ],
              },
            },
          }
        : {}),
    },
  });

  return compatBuild(app, buildOnce);
};
