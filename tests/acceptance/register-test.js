import { module, test } from 'qunit';
import { click, visit, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | register', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /register', async function(assert) {
    await visit('/register');
    assert.equal(currentURL(), '/register');
  });

  test('Register form is empty', async function(assert) {
    await visit('/register');
    const form = this.element.querySelector('form');
    const emailElement = form.querySelector('input[name="email"]');
    const emailValue = emailElement.value;
    const passwordElement = form.querySelector('input[name="password"]');
    const passwordValue = passwordElement.value;

    assert.equal(this.element.querySelector('h3').textContent.trim(), 'Signup');
    assert.equal(emailValue, '', 'Email field is empty');
    assert.equal(passwordValue, '', 'Password field is empty');
  });

  test('Process registeration', async function(assert) {
    await visit('/register');
    const form = this.element.querySelector('form');
    const emailElement = form.querySelector('input[name="email"]');
    const passwordElement = form.querySelector('input[name="password"]');
    
    await fillIn(emailElement, 'john@yopmail.com')
    await fillIn(passwordElement, 'john123');
    await click(this.element.querySelector('button'));
    assert.equal(this.element.querySelector('.text-success').textContent.trim(), 'Successfully Signup!', 'user signup successfully');
  });
});
