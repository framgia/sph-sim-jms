import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/connection.service';

import { AbstractService } from '../../shared/abstract-service';

@Injectable()
export class UserService extends AbstractService {
    constructor(prisma: PrismaService) {
        super(prisma, "User")
    }
}
