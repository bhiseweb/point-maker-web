import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { match, not } from '@ember/object/computed';

export default class LoginController extends Controller {
  @service session;
  @tracked email;
  @tracked password;
  @tracked error;

  @action
  onChange(event) {
    this.set(event.target.name, event.target.value)
  }

  @action
  async authenticate(event) {
    event.preventDefault();
    const email = this.get('email');
    const password  = this.get('password');
    try {
      await this.session.authenticate('authenticator:oauth2', email, password);
    } catch(error) {
      console.log(error)
      this.error = 'Email or password invalid!';
    }
  }
}