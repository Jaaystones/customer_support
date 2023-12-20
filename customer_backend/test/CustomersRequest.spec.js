// test/unit/CustomerRequestModel.spec.js
const { test, trait } = use('Test/Suite')('Customer Request Model');
const CustomerRequest = use('App/Models/CustomerRequest');
const User = use('App/Models/User');

trait('DatabaseTransactions');

test('create a customer request', async ({ assert }) => {
  // Create a user
  const user = await User.create({
    email: 'test@example.com',
    full_name: 'John Doe',
  });

  // Create a customer request
  const customerRequest = await CustomerRequest.create({
    user_id: user.id,
    first_name: 'John',
    last_name: 'Doe',
    email_address: 'test@example.com',
    title: 'Support Title',
    message_text: 'Support message text',
    file: 'path/to/uploaded/file.jpg',
  });

  // Assert the customer request was created
  assert.exists(customerRequest.id);
  assert.equal(customerRequest.first_name, 'John');
  assert.equal(customerRequest.last_name, 'Doe');
  assert.equal(customerRequest.email_address, 'test@example.com');
  assert.equal(customerRequest.title, 'Support Title');
  assert.equal(customerRequest.message_text, 'Support message text');
  assert.equal(customerRequest.file, 'path/to/uploaded/file.jpg');
});
