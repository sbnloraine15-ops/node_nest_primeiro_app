import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from 'generated/prisma/client'



@Injectable()
export class PrismasService extends PrismaClient implements OnModuleInit {
    user: any;


    constructor() {
        const connectionString = process.env.DATABASE_URL ?? 'file:./dev.db';
        const adapter = new PrismaBetterSqlite3({ url: connectionString });

        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
}