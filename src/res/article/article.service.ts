import { Injectable } from '@nestjs/common';
import articleSchema from '../../models/article/article.schema';
import Article from 'src/interface/article.interface';
import genAIdUtil from 'src/utils/genArticleId.util';
import checkXSSUtil from 'src/utils/checkXSS.util';
import * as crypto from 'crypto';

@Injectable()
export class ArticleService {
  async create(newArticleData: Article) {
    let arid = await genAIdUtil();
    await new articleSchema({
      writerId: newArticleData.writerId,
      articleId: arid,
      title: await checkXSSUtil(newArticleData.title),
      content: await checkXSSUtil(newArticleData.content),
      images: newArticleData.images,
      likes: 0,
      category: await checkXSSUtil(newArticleData.category),
      createdAt: Date.now(),
      editData: {
        isEdited: false
      }
    }).save();
    return arid;
  }

  async getIdsByCount(count: number) {
    let returnArr = [];
    const get = await articleSchema.find();
    for (let i = 0; i < count; i++) {
      const rand = crypto.randomInt(0, get.length-1);
      returnArr[i] = get[rand].articleId;
    }
    return returnArr;
  }

  async getById(id: number) {
    if (isNaN(id)) return false;
    const res = await articleSchema.findOne({
      articleId: id
    });
    return res;
  }

  async update(id: number, updateData: Article) {
    const update = await articleSchema.findOneAndUpdate({
      articleId: id
    }, updateData).then(() => {
      return id;
    }).catch((e) => {
      console.error(e);
      return false;
    })
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
