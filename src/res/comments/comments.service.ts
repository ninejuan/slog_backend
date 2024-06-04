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
      return false;
    } else {
      article.comments.unshift({
        writer: newComment.writer,
        createdAt: Date.now(),
        content: newComment.content
      });
      await article.save().then(() => {
        return true;
      }).catch((e) => {
        console.error(e);
        return false;
      });
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
  /**
   * 
   * const article = await articleSchema.findOne({
        articleId: newLike.articleId
      });
      if (article.likes.indexOf(newLike.likerId) == -1) {
        return false;
      } else {
        let i = article.likes.indexOf(newLike.likerId);
        article.likes.splice(i, 1);
        await article.save().then(() => {
          return true;
        }).catch((e) => {
          console.error(e);
          return false;
        });
      }
   */
  async remove(cmts: Comments) {

  }
}
