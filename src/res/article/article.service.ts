import { Injectable } from '@nestjs/common';
import articleSchema from '../../models/article/article.schema';
import Article from 'src/interface/article.interface';
import genAIdUtil from 'src/utils/genArticleId.util';

@Injectable()
export class ArticleService {
  async create(newArticleData: Article) {
    const gen = await genAIdUtil();
    await new articleSchema({
      writerId: newArticleData.writerId,
      articleId: gen,
      title: newArticleData.title,
      content: newArticleData.content,
      // images:
      likes: 0,
      comments: null,
      categories: newArticleData.categories,
      createdAt: Date.now(),
      editData: {
        isEdited: false
      }
    });
    return gen;
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: Article) {
    return `This action updates a #${id} article`;
  }

  async remove(id: number) {
    await articleSchema.findOneAndDelete({
      articleId: id
    }).then(() => {
      return true;
    }).catch((e) => {
      console.error(e);
      return false;
    });
  }
}
