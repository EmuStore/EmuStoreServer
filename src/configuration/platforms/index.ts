import { GamePathDetails } from '../../types/GameTypes';
import NintendoEntertainmentSystem from './NintendoEntertainmentSystem';
import NintendoGameCube from './NintendoGameCube';
import NintendoWii from './NintendoWii';

export default (): GamePathDetails[] => {
	return [NintendoEntertainmentSystem(), NintendoGameCube(), NintendoWii()].filter(
		(pathObj) => pathObj !== null
	) as GamePathDetails[];
};
