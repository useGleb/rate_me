import { IsInt, IsString } from 'class-validator';
import { RatingEntity } from 'src/feedback/feedback_entities/rating.entity';
import { PageEntity } from 'src/page/page.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 24 })
  @IsString()
  name: string;

  @ManyToOne(() => PageEntity, (page) => page.categories, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  page: PageEntity;

  @OneToMany(() => RatingEntity, (rating) => rating.category)
  @JoinColumn()
  ratings: RatingEntity[];
}
