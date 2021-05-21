import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  @service session;

  beforeModel() {
    this._super(...arguments);
    this.get('session').prohibitAuthentication('points');
  }
};
