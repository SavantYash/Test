import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ResponseUtil } from '../utils/Response.util';

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

    getMyBookMarks(userId: string) {
        return this.prisma.bookmark.findMany({ where: { userId } })
    }

    async getBookMarkById(userId: string, id: string) {
        const bookmark = await this.prisma.bookmark.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!bookmark) {
            throw new NotFoundException('Bookmark not found');
        }

        return ResponseUtil.success(bookmark, "Bookmark fetched");
    }

    async patchBookMarkById(userId: string, id: string, dto: any) {
        const bookmark = await this.prisma.bookmark.findUnique({ where: { userId, id } })
        if (!bookmark) {
            throw new NotFoundException('Bookmark not found');
        }
        return this.prisma.bookmark.update({ where: { id }, data: dto })
    }

    async deleteBookMarkById(userId: string, id: string) {
        const result = await this.prisma.bookmark.deleteMany({
            where: {
                id,
                userId,
            },
        });

        if (result.count === 0) {
            throw new NotFoundException('Bookmark not found');
        }

        return ResponseUtil.success('Bookmark removed!');
    }
}
