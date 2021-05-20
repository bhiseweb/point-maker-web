import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
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
    try {
      await window.$.ajax({
        url: path,
        type: 'POST',
        data: postData,
        beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'application/json');},})
        this.error = '';
      this.success = 'Please check your mail to reset password!';
    } catch(error) {
      this.error = 'This email address is not registerd!';
    }
  }

}