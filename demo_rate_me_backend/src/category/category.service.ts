import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEntity } from 'src/page/page.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesPageRepo: Repository<CategoryEntity>,
  ) {}

  createCategoriesForPage(categories: string[], page: PageEntity) {
    return Promise.all(
      categories.map((category) => {
        const rawCategory = {
          page,
          name: JSON.parse(category),
        };
        return this.categoriesPageRepo.save(rawCategory);
      }),
    );
  }

  async calculateAverageForCategory(category: CategoryEntity) {
    const calculatedAvgObj = await this.categoriesPageRepo
      .createQueryBuilder('category')
      .where({ id: category.id })
      .leftJoinAndSelect('category.ratings', 'ratings')
      .select('AVG(ratings.rating)', 'avg')
      .getRawOne();
    return calculatedAvgObj.avg;
  }
}
