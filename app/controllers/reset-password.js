import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import fetch from 'fetch';
import config from 'point-maker-web/config/environment';

export default class ResetPasswordController extends Controller {
  @tracked password;
  @tracked password_confirmation;
  @tracked error;
  @tracked success;
  queryParams = ['reset_password_token'];
  @tracked reset_password_token;

  @action
  onChange(event) {
    this.set(event.target.name, event.target.value)
  }
  
  @action
  async submit(event) {
    event.preventDefault();
    const password = this.get('password');
    const password_confirmation = this.get('password_confirmation');

    if (password === password_confirmation) {
      const postData = {user:{reset_password_token: this.get('reset_password_token'), password: this.get('password'), password_confirmation: this.get('password_confirmation')}};
      const path = `${config.api}/${config.namespace}/users/password`;
      
      return fetch(path,{
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }).then((response) => {
        if(response.status === 204) {
          this.error = '';
          this.success = 'Password reset successfully!';
        } else {
          return response.json();
        }
      }).then((json) => {
        if (json?.errors) {
          const key = Object.keys(json.errors)[0];
          const value = json.errors[key];
          this.error = `${key.split('_').join(' ')} ${value}`;
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    } else {
      this.error = 'Password and confirm password does not match!';
    }
  }
}
