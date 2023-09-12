import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/connection.service';

import { AbstractService } from '../../shared/abstract-service';

@Injectable()
export class ScheduleService extends AbstractService {
    constructor(prisma: PrismaService) {
        super(prisma, "Schedule")
    }
}
