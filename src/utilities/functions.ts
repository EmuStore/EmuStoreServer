import { Response } from 'express';
import { ExpressErrorResponse } from '../types/GenericTypes';

export const handleCaughtError = (error: ExpressErrorResponse | any, res?: Response) => {
	if (res) {
		if ('status' in error && 'message' in error) {
			return res.status(error.status).send(error.message);
		} else {
			return res.status(500).send(error);
		}
	} else {
		// eslint-disable-next-line no-console
		console.log(error);
		return;
	}
};
