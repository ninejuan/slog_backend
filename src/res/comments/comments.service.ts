import { Injectable } from '@nestjs/common';
import mongo from 'mongoose';
import Comments from 'src/interface/comments.interface';
import articleSchema from 'src/models/article/article.schema';
import commentSchema from 'src/models/article/comment.schema';

@Injectable()
export class CommentsService {
  async create(newComment: Comments) {
    await new commentSchema({
      articleId: newComment.articleId,
      writer: newComment.writer,
      content: newComment.content,
      createdAt: Date.now()
    }).save().then(() => {
      return true;
    }).catch((e) => {
      console.error(e);
      return false;
    });
  }

  async findAll(articleId: number) {
    const res = await commentSchema.find({
      articleId: articleId
    });
    return res;
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
    await commentSchema.findOneAndDelete({
      articleId: cmts.articleId,
      writer: cmts.writer,
      content: cmts.content
    }).then(() => {
      return true;
    }).catch((e) => {
      console.error(e);
      return false;
    });
  }
}
