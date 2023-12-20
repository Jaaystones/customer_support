// test/functional/CustomerRequestController.spec.js
const { test, trait } = require('Test/Suite')('Customer Request Controller');
const CustomerRequest = require('App/Models/CustomerRequest');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('submitting a support request', async ({ client, assert }) => {
  // Create a user
  const user = await User.create({
    email: 'test@example.com',
    full_name: 'John Doe',
  });

  // Submit a support request
  const response = await client.post('/support-requests').send({
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@example.com',
    title: 'Support Title',
    message_text: 'Support message text',
    file: 'path/to/uploaded/file.jpg',
  }).end();

  // Assert the response status is 201 (Created)
  response.assertStatus(201);

  // Assert that the support request is linked to the user
  const supportRequest = await CustomerRequest.query().where('email_address', 'test@example.com').first();
  assert.equal(supportRequest.user_id, user.id);

  // Assert that the file is successfully uploaded and stored (you may need to adjust this based on your file handling)
  assert.exists(supportRequest.file);
});
