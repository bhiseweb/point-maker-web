import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'https://aqueous-meadow-88620.herokuapp.com';
  //host = "http://localhost:3000"
  namespace = 'api/v1';
}
