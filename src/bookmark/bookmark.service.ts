import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BookmarkService {

    constructor(private prisma: PrismaService) { }

    create(userId: string, data: { title: string, url: string }) {
        return this.prisma.bookmark.create({
            data: {
                title: data.title,
                url: data.url,
                userId,
            },
        })
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
