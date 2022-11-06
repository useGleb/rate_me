import { IsInt, IsString } from 'class-validator';
import { CategoryEntity } from 'src/category/category.entity';
import { CommentEntity } from 'src/feedback/feedback_entities/comment.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('page')
export class PageEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 24 })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 2048 })
  @IsString()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  image_path?: string;

  @OneToMany(() => CategoryEntity, (category) => category.page)
  @JoinColumn()
  categories?: CategoryEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.page)
  @JoinColumn()
  comments?: CommentEntity[];
}
