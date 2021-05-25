import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import fetch from 'fetch';
import config from 'point-maker-web/config/environment';

export default class ForgotPasswordController extends Controller {
  @tracked email;
  @tracked error;
  @tracked success;

  @action
  onChange(event) {
    this.set(event.target.name, event.target.value)
  }
  
  @action
  async submit(event) {
    event.preventDefault();
    const postData = {user:{email: this.get('email')}};
    const path = `${config.api}/${config.namespace}/users/password`;

    return fetch(path,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json.errors) {
        const key = Object.keys(json.errors)[0];
        const value = json.errors[key];
        this.error = `${key.split('_').join(' ')} ${value}`;
      } else {
        this.error = '';
        this.success = 'Please check your mail to reset password!';
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

}