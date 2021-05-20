import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
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
      
      try {
        await window.$.ajax({
          url: path,
          type: 'PATCH',
          data: postData,
          beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'application/json');}
        })
        this.success = 'Password reset successfully!';
        this.error = '';
      } catch(error) {
        const key = Object.keys(error.responseJSON.errors)[0];
        const value = error.responseJSON.errors[key];
        this.error = `${key.split('_').join(' ')} ${value}`;
      }
    } else {
      this.error = 'Password and confirm password does not match!';
    }

  }

}