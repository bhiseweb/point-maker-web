import Mirage from 'ember-cli-mirage';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:3000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = 'api/v1';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
 this.post('/api/v1/users');
 this.post('/oauth/token', (schema, request) => {
  //  debugger
   const arr = request.requestBody.split('&')
   let obj = {}
   arr.map(ele => {
     let keyVal = ele.split('=')
     obj[keyVal[0]] = decodeURIComponent(keyVal[1])
   })
  if (obj.username === 'john@yopmail.com' && obj.password === 'john123') {
    return {
      access_token: "EUrvzeWjTyfi9OOP0BFJ-gQ8zuglK4RUgWYncQjWTos",
      token_type: "Bearer",
      expires_in: 7200,
      refresh_token: "gUjeyqL-xU8nxYxRBXjGuG4Fxpo6xJ7tLeQE13cmaOY",
      created_at: 1621605413
    }
  } else {
    return new Mirage.Response(401, {}, {message: 'Unauthorized'});
  }
 
 })
}
