import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './feedback_entities/comment.entity';
import { RatingEntity } from './feedback_entities/rating.entity';
import { CategoryEntity } from 'src/category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, RatingEntity, CategoryEntity]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackModule],
})
export class FeedbackModule {}
