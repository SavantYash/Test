import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from './generated/prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }
  async getHello(
  ): Promise<string | null> {
    console.log("DB URL =>", process.env.DATABASE_URL);
    const data = await this.prisma.user.findMany();
    console.log("data",data)
    return 'Hello World!';
  }
}
