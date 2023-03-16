import { IMiddleWare } from './middleware.interface';
import { NextFunction, Response, Request } from 'express';
import { Jwt, JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload !== 'string') {
					req.user = payload.email;
					next();
				}
			});
		}
		next();
	}
}
