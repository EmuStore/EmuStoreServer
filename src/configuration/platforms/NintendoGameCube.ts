import path from 'path';
import { GamePathDetails } from '../../types/GameTypes';
import { validDirectory } from '../../utilities/functions';

const fileExtensions = ['.iso', '.gcm'];

export default (): GamePathDetails | null => {
	const gamesPath = process.env.NINTENDO_GAMECUBE_PATH as string;
	if (validDirectory(gamesPath)) {
		return {
			extensions: fileExtensions,
			path: path.resolve(gamesPath),
			platform: 'nintendo_gamecube'
		};
	}
	return null;
};
