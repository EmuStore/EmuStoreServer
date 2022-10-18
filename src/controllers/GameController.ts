import { Request, Response, Router } from 'express';
import { GameService } from '../services/GameService';
import { handleCaughtError } from '../utilities/functions';

const router = Router();

router.get('/scan', async (_req: Request, res: Response) => {
	try {
		const GS = new GameService();
		return await GS.scanGames(res);
	} catch (error) {
		handleCaughtError(error, res);
	}
});

export default router;
