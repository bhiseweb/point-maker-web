import EmberRouter from '@ember/routing/router';
import config from 'point-maker-web/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  
  this.route('login');
  this.route('register');
  this.route('reset-password');
  this.route('forgot-password');
  // this.route('points', { path: '/map' });
  this.route('points', { path: '/points' });
  // this.route('authenticated', { path: '' }, () => {
      
  // })
});
