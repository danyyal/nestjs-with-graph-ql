export const CreateUserAPI = {
  summary: 'Create New User',
  description: 'Before executing this api add payload and click execute',
  operationId: 'create-user',
};
export const CreateSuccessResponse = {
  status: 201,
  description: 'User created',
  content: {
    json: {
      schema: {
        default: {
          name: 'John',
          email: 'john.doe@company.com',
          phone: '0311-2312589',
          id: 'c29f20b1-4973-48fb-94f8-9b8a2dfe3123',
        },
      },
    },
  },
};
