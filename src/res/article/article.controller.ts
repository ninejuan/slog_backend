import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards, Injectable } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GoogleAuthGuard } from '../auth/guards/google.guard';
import { CallbackUserData } from '../auth/decorator/auth.decorator';
import { AuthGuard } from '../auth/guards/checkAuth.guard';
import Article from 'src/interface/article.interface';
import { ExecutionContext } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import checkXSS from 'src/utils/checkXSS.util';

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

  // @UseGuards(AuthGuard)
  @Get('/lists/:count')
  getIdsByCount(@Param('count') count: number) {
    return this.articleService.getIdsByCount(+count);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.articleService.getById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Article) {
    updateData.title = (await checkXSS(updateData.title)).toString() ?? null;
    updateData.content = (await checkXSS(updateData.content)).toString();
    updateData.category = (await checkXSS(updateData.category)).toString();
    updateData.editData = {
      isEdited: true,
      editedAt: Date.now()
    }
    return this.articleService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(+id);
  }
}
