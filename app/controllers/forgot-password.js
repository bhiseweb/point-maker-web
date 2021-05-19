import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
// import $ from "jquery";
import config from 'point-maker-web/config/environment';

export default class ForgotPasswordController extends Controller {
  @service store;
  // @service ajax;
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
    debugger
    // try {
      // const result = await window.$.ajax({path, type: 'POST', postData})
      // console.log('result==',result)
      // this.success = 'We have sent you a mail with link to reset your password!';
    // } catch(error) {
      // console.log(error)
      // this.error = 'Email is invalid!';
    // }
  }

}