import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { PLATFORMS } from '../app_config';
import { ExpressErrorResponse, GamePathDetails } from '../types/GenericTypes';

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

export const buildGamePaths = (): GamePathDetails[] => {
	const gamePaths: GamePathDetails[] = [];
	let currentPath: string;

	const isValidPath = (filePath: string) =>
		typeof filePath === 'string' && fs.statSync(path.resolve(filePath)).isDirectory();

	// GameCube
	currentPath = process.env.NINTENDO_GAMECUBE_PATH as string;
	if (isValidPath(currentPath)) {
		gamePaths.push({
			path: path.resolve(currentPath),
			platform: PLATFORMS.nintendo_gamecube
		});
	}

	// Wii
	currentPath = process.env.NINTENDO_WII_PATH as string;
	if (isValidPath(currentPath)) {
		gamePaths.push({
			path: path.resolve(currentPath),
			platform: PLATFORMS.nintendo_wii
		});
	}

	return gamePaths;
};
