import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RegisterController extends Controller {
  @tracked email = '';
  @tracked password = '';
  @tracked success;

  @action
  onChange(event) {
    this.set(event.target.name, event.target.value)
  }

  @action
  saveUser(event) {
    event.preventDefault();
    const email = this.get('email');
    const password  = this.get('password');
    const newUser = this.store.createRecord('user', { email, password });
    newUser.save().then((res) => {
      console.log('res==', res)
      this.success = 'Successfully Signup!'
    })
  }
}