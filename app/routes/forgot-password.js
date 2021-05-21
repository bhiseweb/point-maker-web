import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ForgotPasswordRoute extends Route {
  @service session;

  beforeModel() {
    this.get('session').prohibitAuthentication('points');
  }
}
