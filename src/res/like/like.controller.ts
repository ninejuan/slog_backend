import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import Like from 'src/interface/like.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Like")
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() newLike: Like) {
    return this.likeService.create(newLike);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
