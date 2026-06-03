import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createBookmarkSchema } from './bookmark.schema';

@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly service: BookmarkService) { }

    @Post()
    create(
        @Body(new ZodValidationPipe(createBookmarkSchema))
        body: any,
    ) {
        return this.service.create(body);
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
