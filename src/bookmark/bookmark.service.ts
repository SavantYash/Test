import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService) { }

    create(data: { title: string, url: string, userId: string }) {
        return this.prisma.bookmark.create({ data })
    }

    findAll() {
        return this.prisma.bookmark.findMany({
            include: { user: true },
        })
    }

    findOne(id: string) {
        return this.prisma.bookmark.findFirst({ where: { id } })
    }

    remove(id: string) {
        return this.prisma.bookmark.delete({ where: { id } })
    }
}
