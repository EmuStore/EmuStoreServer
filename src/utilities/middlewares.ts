import { NextFunction, Request, Response } from 'express';
import { DB } from '../connectors/sequelize';
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
			const sequelize = await DB.getConnection();
			if (!sequelize) {
				throw RESPONSES.generic.databaseConnectionError;
			}
			const { models } = sequelize;
			const appTokenObj = await models.Config.findOne({
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
