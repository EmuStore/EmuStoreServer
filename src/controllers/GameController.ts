import { Request, Response, Router } from 'express';
import { GameService } from '../services/GameService';
import { handleCaughtError } from '../utilities/functions';

const router = Router();

router.get('/list', async (_req: Request, res: Response) => {
	try {
		const GS = new GameService();
		return await GS.getAllGames(res);
	} catch (error) {
		handleCaughtError(error, res);
	}
});

router.get('/download', async (req: Request, res: Response) => {
	try {
		const GS = new GameService();
		return await GS.sendGame(req, res);
	} catch (error) {
		handleCaughtError(error, res);
	}
});

router.get('/scan', async (_req: Request, res: Response) => {
	try {
		const GS = new GameService();
		return await GS.scanGames(res);
	} catch (error) {
		handleCaughtError(error, res);
	}
});

export default router;
