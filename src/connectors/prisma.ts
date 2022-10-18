import { PrismaClient } from '@prisma/client';

export const prisma: PrismaClient = new PrismaClient({
	errorFormat: 'pretty'
});

export class PC {
	private static client: PrismaClient | null = null;

	private static async connect(): Promise<PrismaClient> {
		if (this.client) {
			await this.client.$connect();
			return this.client;
		}

		this.client = new PrismaClient({
			errorFormat: 'pretty'
		});

		await this.client.$connect();

		return this.client;
	}

	public static async getClient(): Promise<PrismaClient | void> {
		try {
			return await this.connect();
		} catch (ex) {
			// eslint-disable-next-line no-console
			console.log('Prisma Exception', ex);
		}
	}

	public static async disconnect(): Promise<void> {
		await this.client?.$disconnect();
		this.client = null;
	}
}
