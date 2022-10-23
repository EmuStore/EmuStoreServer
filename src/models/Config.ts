import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

type ConfigAttributes = {
	id: number;
	propertyName: string;
	propertyValue: string;
};

type ConfigOptionalAttributes = keyof Pick<ConfigAttributes, 'id'>;

type ConfigCreationAttributes = Optional<ConfigAttributes, ConfigOptionalAttributes>;

export class Config
	extends Model<ConfigAttributes, ConfigCreationAttributes>
	implements ConfigAttributes
{
	id!: number;
	propertyName!: string;
	propertyValue!: string;

	static initModel(sequelize: Sequelize.Sequelize): typeof Config {
		return sequelize.define('Config', {
			id: {
				autoIncrement: true,
				type: DataTypes.BIGINT,
				allowNull: false,
				primaryKey: true
			},
			propertyName: {
				type: DataTypes.STRING(99),
				allowNull: false,
				unique: true
			},
			propertyValue: {
				type: DataTypes.STRING(9999),
				allowNull: false
			}
		}) as typeof Config;
	}
}
