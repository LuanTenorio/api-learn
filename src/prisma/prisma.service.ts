import { INestApplication, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../generated/prisma/client';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  private logger = new Logger(PrismaService.name)

  @Inject()
  private configService: ConfigService

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' }
      ],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    this.logs()
    await this.$connect();
  }

  async logs() {
    if (!this.configService.config.log.showQuery)
      return

    this.$on("query" as never, async ({ query, params, duration }: Prisma.QueryEvent) => {
      this.logger.log(`[Query] ${duration}ms ${params} -- '${query}'`)
    })
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
