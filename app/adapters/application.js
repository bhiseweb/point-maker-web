import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import config from 'point-maker-web/config/environment';


export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
    }

    return headers;
  }
  
  host = config.api;
  namespace = config.namespace;
}
