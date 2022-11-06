import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/category.entity';
import { IPageRef } from 'src/page/page.interface';
import { Repository } from 'typeorm';
import { RateRequestBody } from './feedback.interface';
import { CommentEntity } from './feedback_entities/comment.entity';
import { RatingEntity } from './feedback_entities/rating.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(RatingEntity)
    private readonly ratingRepo: Repository<RatingEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async rate(pageRef: IPageRef, data: RateRequestBody) {
    const raw_comment = {
      page: pageRef,
      message: data.message,
    };

    const comment = await this.commentRepo.save(raw_comment);

    const raw_ratings = data.category_ratings.map((category_rating) => ({
      rating: category_rating.rating,
      category: { id: category_rating.category.id },
      comment: { id: comment.id },
    }));

    return this.ratingRepo.save(raw_ratings);
    // return Promise.all(
    //   raw_ratings.map((raw_rating) => this.ratingRepo.save(raw_rating)),
    // );
  }

  async getComments(pageRef: IPageRef) {
    return this.commentRepo.find({
      where: {
        page: pageRef,
      },
      relations: {
        ratings: {
          category: true,
        },
      },
    });
  }
}
