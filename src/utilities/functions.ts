import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ExpressErrorResponse } from '../types/ExpressTypes';

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

export const validDirectory = (filePath: string) =>
	typeof filePath === 'string' &&
	filePath.length &&
	fs.statSync(path.resolve(filePath)).isDirectory();

export const validString = (value: unknown): boolean =>
	typeof value === 'string' && value !== '';
