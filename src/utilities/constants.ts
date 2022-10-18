export const RESPONSES = {
	auth: {
		invalidAuthorization: {
			status: 403,
			message: 'Invalid or Null Authorization.'
		},
		missingAuth: {
			status: 400,
			message: 'An API token was not found in the request.'
		},
		rejected: {
			status: 401,
			message: 'You are not authorized to access that resource.'
		}
	},
	generic: {
		notFound: {
			status: 404,
			message: 'The requested resource was not found.'
		}
	},
	prisma: {
		connectionError: {
			status: 500,
			message: 'Failed to Connect to the Database.'
		}
	}
};
