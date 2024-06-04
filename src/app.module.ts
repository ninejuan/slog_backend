import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './res/auth/auth.module';
import { ArticleModule } from './res/article/article.module';
import { LikeModule } from './res/like/like.module';
import { CommentsModule } from './res/comments/comments.module';

@Module({
  imports: [AuthModule, ArticleModule, LikeModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
