import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV !== 'production') {
	require('./utilities/processListeners');
}

import compression from 'compression';
import cors from 'cors';
import express, {
	Application,
	json,
	NextFunction,
	Request,
	Response,
	urlencoded
} from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import logger from 'morgan';
import routes from './controllers/routes';
import { validateRequest } from './utilities/middlewares';

const app: Application = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per 15 minutes
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

if (process.env.NODE_ENV !== 'production') {
	app.use(logger('dev'));
}

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());
app.use(limiter);
app.use(helmet());
app.use(validateRequest());
app.disable('x-powered-by');

app.use(routes);

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
	res.status('status' in err ? err.status : 500).send(
		'message' in err ? err.message : err
	);
	// eslint-disable-next-line no-console
	console.error({
		path: req.url,
		error: err
	});
});

const port = process.env.PORT ? process.env.PORT : 3080;
app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log('Listening on port', port);
});
