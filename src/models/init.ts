import type { Sequelize } from 'sequelize';
import { Config as _Config } from './Config';
import { Game as _Game } from './Game';

export const initModels = (sequelize: Sequelize) => {
	const Config = _Config.initModel(sequelize);
	const Game = _Game.initModel(sequelize);

	return {
		Config: Config,
		Game: Game
	};
};
