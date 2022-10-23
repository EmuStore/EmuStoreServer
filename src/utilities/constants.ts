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
	game: {
		gamePathNotFound: {
			status: 500,
			message:
				'Either the path to the requested game either is incorrect or the game file has been moved.'
		},
		invalidGameName: {
			status: 400,
			message:
				'`name` is required in the request body and must be a non-empty string.'
		},
		invalidGamePlatform: {
			status: 400,
			message:
				'`platform` is required in the request body and must be a non-empty string.'
		}
	},
	generic: {
		databaseConnectionError: {
			status: 500,
			message: 'Failed to Connect to the Database.'
		},
		notFound: {
			status: 404,
			message: 'The requested resource was not found.'
		}
	}
};
