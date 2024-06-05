import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import Comments from '../../interface/comments.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  async create(@Body() newComment: Comments) {
    return this.commentsService.create(newComment);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.commentsService.findAll(+id);
  }

  @Delete()
  remove(@Body() cmts: Comments) {
    return this.commentsService.remove(cmts);
  }
}
