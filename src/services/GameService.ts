import { Response } from 'express';
import fs from 'fs';
import path from 'path';
import { PLATFORM_FILE_EXTENSIONS } from '../app_config';
import { DB } from '../connectors/sequelize';
import { RESPONSES } from '../utilities/constants';
import { buildGamePaths } from '../utilities/functions';

export class GameService {
	public async scanGames(res: Response) {
		const sequelize = await DB.getConnection();
		if (!sequelize) {
			throw RESPONSES.generic.databaseConnectionError;
		}
		const { models } = sequelize;
		await models.Game.sync({ force: true });
		const gamePaths = buildGamePaths();
		for (let i = 0; i < gamePaths.length; i++) {
			const gamePathObj = gamePaths[i];
			const files = fs.readdirSync(gamePathObj.path);
			for (let j = 0; j < files.length; j++) {
				const fileName = files[j];
				const fullPath = path.resolve(`${gamePathObj.path}/${fileName}`);
				const validExtensions = PLATFORM_FILE_EXTENSIONS[gamePathObj.platform];
				let fileNameWithoutExtension = fileName;
				let validFile = false;
				validExtensions.forEach((ext) => {
					if (fs.statSync(fullPath).isFile()) {
						if (fileName.endsWith(ext.toLowerCase())) {
							validFile = true;
							fileNameWithoutExtension = fileName.replace(
								ext.toLowerCase(),
								''
							);
						} else if (fileName.endsWith(ext.toUpperCase())) {
							validFile = true;
							fileNameWithoutExtension = fileName.replace(
								ext.toUpperCase(),
								''
							);
						}
					}
				});
				if (!validFile) continue;
				const fileSize = fs.statSync(fullPath).size;
				await models.Game.create({
					name: fileNameWithoutExtension,
					path: fullPath,
					platform: gamePathObj.platform,
					size: fileSize
				});
			}
		}
		res.status(200).send('Ok');
	}
}
