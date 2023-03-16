import { IMiddleWare } from './middleware.interface';
import { NextFunction, Response, Request } from 'express';

export class AuthGuard implements IMiddleWare {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (!req.user) {
			res.status(401).send('Пользователь не авторизован');
		} else {
			next();
		}
	}
}
