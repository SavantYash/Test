import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createBookmarkSchema, updateBookmarkSchema } from './bookmark.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly service: BookmarkService) { }

    @Post()
    create(
        @Body(new ZodValidationPipe(createBookmarkSchema))
        body: any,
        @GetUser('id') userId: string,
    ) {
        return this.service.create(userId, body);
    }

    @Get()
    getMyBookMarks(@GetUser('id') userId: string) { return this.service.getMyBookMarks(userId) }

    @Get(':id')
    getBookMarkById(@GetUser('id') userId: string, @Param('id') id: string) { return this.service.getBookMarkById(userId, id) }

    @Patch(':id')
    patchBookMarkById(
        @GetUser('id') userId: string,
        @Param('id') id: string,
        @Body(new ZodValidationPipe(updateBookmarkSchema)) body: any
    ) {
        return this.service.patchBookMarkById(userId, id,body)
    }
}
