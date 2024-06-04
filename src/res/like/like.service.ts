import { Injectable } from '@nestjs/common';
import Like from 'src/interface/like.interface';

@Injectable()
export class LikeService {
  create(createLikeDto: Like) {
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: Like) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
