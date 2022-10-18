import { NextFunction, Request, Response } from 'express';
import { PC } from '../connectors/prisma';
import { RESPONSES } from './constants';
import { handleCaughtError } from './functions';

export const validateRequest = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { authorization } = req.headers;
			if (typeof authorization !== 'string' || !authorization.length) {
				throw RESPONSES.auth.missingAuth;
			}
			const fullToken = authorization.split(' ');
			if (fullToken.length !== 2) {
				throw RESPONSES.auth.invalidAuthorization;
			}
			const initiator = fullToken[0].toLowerCase();
			if (initiator !== 'bearer') {
				throw RESPONSES.auth.invalidAuthorization;
			}
			const token = fullToken[1];
			const prisma = await PC.getClient();
			if (!prisma) {
				throw RESPONSES.prisma.connectionError;
			}
			const appTokenObj = await prisma.config.findFirst({
				where: {
					propertyName: 'token'
				}
			});
			if (!appTokenObj) {
				throw RESPONSES.auth.rejected;
			}
			if (token !== appTokenObj.propertyValue) {
				throw RESPONSES.auth.rejected;
			}
			return next();
		} catch (error) {
			handleCaughtError(error, res);
		}
	};
};
