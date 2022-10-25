import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import buildGamePaths from '../configuration/platforms';
import { DB } from '../connectors/sequelize';
import { RESPONSES } from '../utilities/constants';
import { validString } from '../utilities/functions';

export class GameService {
	public async getAllGames(res: Response) {
		const sequelize = await DB.getConnection();
		if (!sequelize) {
			throw RESPONSES.generic.databaseConnectionError;
		}
		const { models } = sequelize;
		const games = await models.Game.findAll({
			attributes: ['id', 'name', 'fileName', 'platform', 'size']
		});
		res.send(games);
	}

	public async sendGame(req: Request, res: Response) {
		const { name, platform } = req.query;
		if (!validString(name)) {
			throw RESPONSES.game.invalidGameName;
		}
		if (!validString(platform)) {
			throw RESPONSES.game.invalidGameName;
		}
		const sequelize = await DB.getConnection();
		if (!sequelize) {
			throw RESPONSES.generic.databaseConnectionError;
		}
		const { models } = sequelize;
		const game = await models.Game.findOne({
			where: {
				name: name as string,
				platform: platform as string
			}
		});
		if (!game) {
			throw RESPONSES.generic.notFound;
		}
		if (!fs.existsSync(game.path) || !fs.statSync(game.path).isFile()) {
			throw RESPONSES.game.gamePathNotFound;
		}
		const stream = fs.createReadStream(game.path);
		stream.pipe(res);
	}

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
				let fileNameWithoutExtension = fileName;
				let validFile = false;
				if (fs.statSync(fullPath).isFile()) {
					gamePathObj.extensions.forEach((ext) => {
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
					});
				} else {
					validFile = false;
				}
				if (!validFile) continue;
				const fileSize = fs.statSync(fullPath).size;
				await models.Game.create({
					name: fileNameWithoutExtension,
					fileName: fileName,
					path: fullPath,
					platform: gamePathObj.platform,
					size: fileSize
				});
			}
		}
		res.status(200).send('Ok');
	}
}
