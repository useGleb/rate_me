import { IsInt, IsString } from 'class-validator';
import { CategoryEntity } from 'src/category/category.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity('rating')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({ type: 'int', nullable: false })
  @IsInt()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.ratings)
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.ratings)
  @JoinColumn()
  comment?: CommentEntity;
}
