import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import Comments from '../../interface/comments.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/checkAuth.guard';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() newComment: Comments) {
    return this.commentsService.create(newComment);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findAll(@Param('id') id: string) {
    return this.commentsService.findAll(+id);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Body() cmts: Comments) {
    return this.commentsService.remove(cmts);
  }
}
