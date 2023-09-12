/* eslint @typescript-eslint/no-explicit-any: "off" */
import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../database/connection.service";

@Injectable()
export class AbstractService {
    constructor(
        protected prisma: PrismaService,
        protected modelName: Prisma.ModelName
    ) {}

    async create(options: any): Promise<any> {
        return await this.prisma[this.modelName].create({
            data: options
        })
    }

    async findOne(options: any): Promise<any> {
        return await this.prisma[this.modelName].findUnique({
            where: options
        })
    }

    async findAll(): Promise<any> {
        return await this.prisma[this.modelName].findMany()
    }
}
