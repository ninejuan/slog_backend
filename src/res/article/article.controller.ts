import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Injectable } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GoogleAuthGuard } from '../auth/guards/google.guard';
import { CallbackUserData } from '../auth/decorator/auth.decorator';
import { AuthGuard } from '../auth/guards/checkAuth.guard';
import Article from 'src/interface/article.interface';
import { ExecutionContext } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Auth 검증은 살짝 미루기
@ApiTags("Article CRUD")
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() newArticleData: Article) {
    return this.articleService.create(newArticleData);
  }

  @Get('/lists/:count')
  getIdsByCount(@Param('count') count: number) {
    return this.articleService.getIdsByCount(+count);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.articleService.getById(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Article) {
    return this.articleService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(+id);
  }
}
