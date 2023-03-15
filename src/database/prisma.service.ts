import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: LoggerService) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[PrismaService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] ошибка подключения к базе данных' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
