import crypto from 'crypto';
import { DB } from '../connectors/sequelize';
import { RESPONSES } from '../utilities/constants';
import { handleCaughtError } from '../utilities/functions';

const generateToken = async () => {
	const sequelize = await DB.getConnection();
	if (!sequelize) {
		throw RESPONSES.generic.databaseConnectionError;
	}
	const { models } = sequelize;

	const token = crypto.randomBytes(48).toString('base64url');

	await models.Config.sync({ alter: true });
	await models.Config.upsert({
		propertyName: 'token',
		propertyValue: token
	});

	// eslint-disable-next-line no-console
	console.log(
		'Your new API token is:\n\n' +
			token +
			'\n\nCopy the token and paste it into your EmuStore app settings. DO NOT share this token with anyone.'
	);
};

const main = async () => {
	try {
		await generateToken();
	} catch (error) {
		handleCaughtError(error);
	}
};

main();
