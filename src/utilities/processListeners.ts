import { PC } from '../connectors/prisma';

async function exitApp() {
	try {
		await PC.disconnect();
		process.exit(0);
	} catch (ex) {
		// eslint-disable-next-line no-console
		console.error(ex);
		process.exit(1);
	}
}

process.on('SIGINT', async function () {
	await exitApp();
});
