export enum SuccessResponses {}

export enum ErrorResponses {
  USER_NOT_FOUND = 'User not found.',
  UNAUTHORIZED = 'Unauthorized',
  MISSING_TOKEN = 'Authorization Token missing',
  NOT_FOUND = 'Not found.',
  FILENAME_ALREADY_EXISTS = 'Filename already exists',
  NAME_ALREADY_EXIST = 'Name already exists',
  CONTACT_ALREADY_EXIST = 'Contact already exists',
  EMAIL_ALREADY_EXIST = 'Email already exists',
  ADDRESS_ALREADY_EXIST = 'Address already exists',
  INTERNALID_ALREADY_EXIST = 'InternalID already exists',
  DOCUMENTID_ALREADY_EXIST = 'DocumentID already exists',
}

export const BadRequestResponse = {
  description: 'Bad Request',
  content: {
    json: {
      schema: {
        default: {
          message: [
            'field_name should not be empty',
            'field_name must be a field_type',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    },
  },
};

export const InternalServerErrorResponse = {
  description: 'Internal Server Error',
  content: {
    json: {
      schema: {
        default: {
          message: 'Something went wrong',
          error: 'Bad Request',
          statusCode: 500,
        },
      },
    },
  },
};
