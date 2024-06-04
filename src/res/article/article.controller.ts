import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Injectable } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GoogleAuthGuard } from '../auth/guards/google.guard';
import { CallbackUserData } from '../auth/decorator/auth.decorator';
import { checkAuth } from '../auth/decorator/checkAuth.decorator';
import Article from 'src/interface/article.interface';
import { ExecutionContext } from '@nestjs/common';

// Auth 검증은 살짝 미루기
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  
  // @Get('/hi')
  // @checkAuth()
  // // @UseGuards(GoogleAuthGuard)
  // async hi(@CallbackUserData() user) {

  // }


  @UseGuards(GoogleAuthGuard)
  @Post()
  create(@Body() newArticleData: Article) {
    return this.articleService.create(newArticleData);
  }

  @Get(':count')
  findAll() {
    return this.articleService.findCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Article) {
    return this.articleService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: Number) {
    return this.articleService.remove(+id);
  }
}
