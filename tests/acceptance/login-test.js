import { module, test } from 'qunit';
import { click, visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /login', async function(assert) {
    await visit('/login');
    
    assert.equal(currentURL(), '/login');
  });

  test('Process login', async function(assert) {
    await visit('/login');
    
    const form = this.element.querySelector('form');
    const emailElement = form.querySelector('input[name="email"]');
    const passwordElement = form.querySelector('input[name="password"]');
    
    await fillIn(emailElement, 'john@yopmail.com')
    await fillIn(passwordElement, 'john123');
    await click(this.element.querySelector('button'));
    assert.equal(currentURL(), '/', 'Redirected to home page');
  });
});
