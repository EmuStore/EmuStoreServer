import path from 'path';
import { Sequelize } from 'sequelize';
import { initModels } from '../models/init';

type DBObject = {
	db: Sequelize;
	models: ReturnType<typeof initModels>;
};

export class DB {
	private static db: Sequelize;
	public static models: ReturnType<typeof initModels>;

	public static async getConnection(): Promise<DBObject | null> {
		try {
			if (this.db) {
				return await this.db
					.authenticate()
					.then(() => {
						return {
							db: this.db,
							models: this.models
						};
					})
					.catch(async () => {
						// eslint-disable-next-line no-console
						console.log(
							'Connection to the database was lost. Creating a new connection...'
						);
						await this.connect();
						this.models = initModels(this.db);
						return {
							db: this.db,
							models: this.models
						};
					});
			} else {
				await this.connect();
				this.models = initModels(this.db);
				return {
					db: this.db,
					models: this.models
				};
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
			return null;
		}
	}

	private static async connect(): Promise<void> {
		const connection: Sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: path.resolve(__dirname, './db.sqlite'),
			logging: false
		});
		await connection.authenticate();
		this.db = connection;
	}
}
