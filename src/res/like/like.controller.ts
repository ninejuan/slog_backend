import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import Like from 'src/interface/like.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Like")
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async add(@Body() newLike: Like) {
    return this.likeService.add(newLike);
  }

  @Delete()
  async remove(@Body() newLike: Like) {
    return this.likeService.remove(newLike);
  }
}
