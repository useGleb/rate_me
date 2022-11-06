import { IsInt, IsString } from 'class-validator';
import { CategoryEntity } from 'src/category/category.entity';
import { PageEntity } from 'src/page/page.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { RatingEntity } from './rating.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  @IsString()
  message: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  @IsString()
  generated_user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => PageEntity, (page) => page.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  page: PageEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.comment)
  @JoinColumn()
  ratings?: RatingEntity[];
}
