import path from 'path';
import { GamePathDetails } from '../../types/GameTypes';
import { validDirectory } from '../../utilities/functions';

const fileExtensions = ['.nes'];

export default (): GamePathDetails | null => {
	const gamesPath = process.env.NINTENDO_ENTERTAINMENT_SYSTEM_PATH as string;
	if (validDirectory(gamesPath)) {
		return {
			extensions: fileExtensions,
			path: path.resolve(gamesPath),
			platform: 'nintendo_entertainment_system'
		};
	}
	return null;
};
