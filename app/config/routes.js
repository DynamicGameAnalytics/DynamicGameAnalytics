/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  'post /login': 'AuthController.login',
  'post /register': 'AuthController.register',
  'get /logout': 'AuthController.logout',
  'get /login': {view: 'login'},
  'get /register': {view: 'register'},

  'get r|storage(?:\/(.*))?|path': {
    controller: 'StorageController',
    action: 'get',
    skipAssets: true
  },
  'post r|storage(?:\/(.*))?|path': {
    controller: 'StorageController',
    action: 'set',
    skipAssets: true
  },
  'update r|storage(?:\/(.*))?|path': {
    controller: 'StorageController',
    action: 'update',
    skipAssets: true
  },
  'delete r|storage(?:\/(.*))?|path': {
    controller: 'StorageController',
    action: 'remove',
    skipAssets: true
    },
};
