import { Injectable } from '@nestjs/common';
import Comments from 'src/interface/comments.interface';

@Injectable()
export class CommentsService {
  create(createCommentDto: Comments) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: Comments) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
