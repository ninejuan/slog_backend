import { Injectable } from '@nestjs/common';
import Comments from 'src/interface/comments.interface';
import articleSchema from 'src/models/article/article.schema';

@Injectable()
export class CommentsService {
  async create(newComment: Comments) {
    const article = await articleSchema.findOne({
      articleId: newComment.articleId
    });
    if (article.comments.find(data => data.writer == newComment.writer)) {
      return false
    }
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateComment: Comments) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    
  }
}
