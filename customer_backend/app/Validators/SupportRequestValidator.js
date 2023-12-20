'use strict'



class SupportRequestValidator {
  get rules () {
    return {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email',
      support_message_title: 'required',
      support_message_text: 'required',
      file: 'file|file_ext:png,jpg,jpeg,pdf|max:5mb'
    }
  }

  get messages () {
    return {
      'first_name.required': 'First name is required.',
      'last_name.required': 'Last name is required.',
      'email.required': 'Email is required.',
      'email.email': 'Invalid email format.',
      'support_message_title.required': 'Support message title is required.',
      'support_message_text.required': 'Support message text is required.',
      'file.file': 'Invalid file format.',
      'file.file_ext': 'Allowed file formats are png, jpg, jpeg, and pdf.',
      'file.max': 'File size should not exceed 5MB.'
    }
  }
}

module.exports = SupportRequestValidator