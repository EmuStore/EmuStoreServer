import { Request, Response, Router } from 'express';
import { RESPONSES } from '../utilities/constants';
import { handleCaughtError } from '../utilities/functions';

import GameController from './GameController';

const router = Router();

router.use('/game', GameController);

router.use((_req: Request, res: Response) =>
	handleCaughtError(RESPONSES.generic.notFound, res)
);

export default router;
