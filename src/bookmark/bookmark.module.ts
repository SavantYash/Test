import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [BookmarkService, PrismaService],
  controllers: [BookmarkController]
})
export class BookmarkModule { }
