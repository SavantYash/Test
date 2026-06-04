import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createBookmarkSchema } from './bookmark.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../common/get-user.decorator';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly service: BookmarkService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @Body(new ZodValidationPipe(createBookmarkSchema))
        body: any,
        @GetUser('id') userId: string,
    ) {
        return this.service.create(userId, body);
    }

    @Get()
    findAll() { return this.service.findAll() }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
