'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'point-maker-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    api: 'http://localhost:3000', //'https://aqueous-meadow-88620.herokuapp.com'
    namespace:'api/v1',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'mapbox-gl': {
      accessToken: 'pk.eyJ1IjoibGVlbmEtd2ViIiwiYSI6ImNrb2k4dTNzajB1MWsyb25zcDQ5MDh5ZTMifQ.KXpvP9jclC3Ry6oa4vy7OA',
      map: {
        style: 'mapbox://styles/mapbox/basic-v9',
        zoom: 5,
        center: [ -96.7969879, 32.7766642 ]
      },
      marker: {
        offset: [ -1, -1 ]
      },

    }


  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV['ember-simple-auth'] = {
      routeAfterAuthentication: 'points'
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV['ember-simple-auth'] = {
      routeAfterAuthentication: 'points'
    }
  }

  if (environment === 'production') {
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    // here you can enable a production-specific feature
  }
  return ENV;
};
