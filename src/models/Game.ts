import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

type GameAttributes = {
	id: number;
	name: string;
	path: string;
	size: number;
	platform: string;
};

type GameOptionalAttributes = keyof Pick<GameAttributes, 'id'>;

type GameCreationAttributes = Optional<GameAttributes, GameOptionalAttributes>;

export class Game
	extends Model<GameAttributes, GameCreationAttributes>
	implements GameAttributes
{
	id!: number;
	name!: string;
	path!: string;
	size!: number;
	platform!: string;

	static initModel(sequelize: Sequelize.Sequelize): typeof Game {
		return sequelize.define('Game', {
			id: {
				autoIncrement: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING(999),
				allowNull: false
			},
			path: {
				type: DataTypes.STRING(9999),
				allowNull: false
			},
			size: {
				type: DataTypes.BIGINT,
				allowNull: false
			},
			platform: {
				type: DataTypes.STRING(99),
				allowNull: false
			}
		}) as typeof Game;
	}
}
