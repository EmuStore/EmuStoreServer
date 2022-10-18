import { Request, Response, Router } from 'express';
import { handleCaughtError } from '../utilities/functions';

const router = Router();

router.get('/scan', async (_req: Request, res: Response) => {
	try {
		res.status(200).send('Ok');
	} catch (error) {
		handleCaughtError(error, res);
	}
});

export default router;
