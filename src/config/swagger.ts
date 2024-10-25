import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HouseComms API',
      version: '1.0.0',
      description: 'API Docs for the HouseComms backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Dev server',
      },
    ],
    components: {
      schemas: {
        UserInfo: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Unique identifier for the User Info',
            },
            hubs: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'An array with the hub codes the user has access to',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the User Info',
            },
          },
        },
        HubInfo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Hub name',
            },
            description: {
              type: 'string',
              description: 'Hub description',
            },
            url: {
              type: 'string',
              description: 'CDN url of the hub image',
            },
            participants: {
              type: 'array',
              items: {
                type: 'string',
              },
              description:
                'An array with the ids of the users involved in the hub',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date of the User Info',
            },
            pantryId: {
              type: 'string',
              description: 'The id of the pantry connected to the hub',
            },
          },
        },
        IdInput: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique username for the User Info created',
            },
          },
        },
        HubInput: {
          type: 'object',
          properties: {
            name: {
              type: String,
              description: 'Unique name for the Hub',
            },
            description: {
              type: String,
              description: 'Description to be shown in the Hub main view',
            },
            image: {
              type: String,
              description: 'The Url of the image that represents the Hub',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                    description: 'Validation error message',
                  },
                  param: {
                    type: 'string',
                    description: 'Parameter that caused the error',
                  },
                  location: {
                    type: 'string',
                    description:
                      'Location of the parameter (body, params, query)',
                  },
                },
              },
              description: 'Details of the validation errors',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
