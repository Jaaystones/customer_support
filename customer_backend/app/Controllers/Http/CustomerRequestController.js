'use strict'

const User = use('App/Models/User')
const SupportRequest = use('App/Models/CustomerRequest')
const { validate } = require('Validator')
const Helpers = use('Helpers')
const SupportRequestValidator = use('App/Validators/SupportRequestValidator')

class CustomerRequestController {
  /**
   * Create a new support request and link it to a user.
   * POST support-requests
   */
  async storeSupportRequest({ request, response }) {
    // Validate request data using Adonis Validator
    // const validation = await validate(request.all(), SupportRequestValidator.rules)

    // if (validation.fails()) {
    //   return response.status(422).json({ errors: validation.messages() })
    // }

    // Check if a file is present in the request
    const file = request.file('file')
    if (!file) {
      return response.status(422).json({ error: 'No file attached to the request' })
    }

    // Store uploaded file locally using Adonis File handling
    const fileName = `${new Date().getTime()}_${file.clientName}`
    const filePath = `uploads/${fileName}`
    await file.move(Helpers.publicPath('uploads'), {
      name: fileName,
      overwrite: true,
    })

    if (!file.moved()) {
      return response.status(500).json({ error: 'Error moving file' })
    }

    // Link the request to a user via the provided email address
    const userEmail = request.input('email_address')
    const user = await User.findOrCreate({ email_address: userEmail }, { email_address: userEmail, full_name: `${request.input('first_name')} ${request.input('last_name')}` })

    const supportRequest = new SupportRequest()
    supportRequest.fill({
      user_id: user.id,
      first_name: request.input('first_name'),
      last_name: request.input('last_name'),
      email_address: userEmail,
      title: request.input('title'),
      message_text: request.input('message_text'),
      file: filePath,
    })
    await supportRequest.save()

    return response.status(201).json({ 
      message: 'Support request submitted successfully',
      data: user})
  }

  /**
   * Get all support requests for a user.
   * GET users/:id/support-requests
   */
  async getSupportRequests({ params, response }) {
    try {
      const user = await User.findOrFail(params.id)

      // Fetch support requests for the user
      const supportRequests = await SupportRequest.query().where('user_id', user.id).fetch()

      return response.json({
        message: 'Support requests retrieved successfully.',
        data: {
          user,
          supportRequests
        }
      })
    } catch (error) {
      return response.status(404).json({
        message: 'User not found',
        error: error.message
      })
    }
  }
}

module.exports = CustomerRequestController
