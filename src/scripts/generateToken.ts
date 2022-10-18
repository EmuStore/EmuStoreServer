import crypto from 'crypto';
import { PC } from '../connectors/prisma';
import { RESPONSES } from '../utilities/constants';
import { handleCaughtError } from '../utilities/functions';

const generateToken = async () => {
	const prisma = await PC.getClient();
	if (!prisma) {
		throw RESPONSES.prisma.connectionError;
	}

	const token = crypto.randomBytes(48).toString('base64url');

	await prisma.config.upsert({
		create: {
			propertyName: 'token',
			propertyValue: token
		},
		update: {
			propertyValue: token
		},
		where: {
			propertyName: 'token'
		}
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
