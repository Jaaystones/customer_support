'use strict';
const User = use('App/Models/User');

class UserController {
  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, response }) {
    try {
      const { email_address, full_name } = request.post();

      const user = new User();
      user.email_address = email_address;
      user.full_name = full_name;

      // Save user
      await user.save();

      return response.json({
        message: 'Successfully created a new User!',
        data: user,
      });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return response.status(400).json({
          message: 'Duplicate entry for email address.',
          error: error.message,
        });
      } else {
        // Handle other errors
        return response.status(500).json({
          message: 'Internal Server Error',
          error: error.message,
        });
      }
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, response }) {
    try {
      const user = await User.findOrFail(params.id);

      return response.json({
        message: 'User retrieved successfully.',
        data: user,
      });
    } catch (error) {
      return response.status(404).json({
        message: 'User not found',
        error: error.message,
      });
    }
  }

}

module.exports = UserController;
