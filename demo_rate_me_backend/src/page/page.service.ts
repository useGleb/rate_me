import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { imageSaveAsThumbnail } from 'src/utils/image.utils';
import { Repository } from 'typeorm';
import { PageEntity } from './page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private readonly pageRepo: Repository<PageEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async createPage(data, image: Express.Multer.File) {
    const savedThumbnailPath = await imageSaveAsThumbnail(image);
    const rawPage = {
      name: data.name,
      description: data.description,
      image_path: savedThumbnailPath,
    };
    const page = await this.pageRepo.save(rawPage);
    await this.categoryService.createCategoriesForPage(data.categories, page);
    return page;
  }

  async getPage(id: number) {
    //ToDo there should be a better way
    const page = await this.pageRepo.findOne({
      where: { id },
      relations: { categories: true },
    });

    const calculatedCategories = await Promise.all(
      page.categories.map(async (category) => ({
        avg: await this.categoryService.calculateAverageForCategory(category),
        ...category,
      })),
    );
    page.categories = calculatedCategories;
    return page;
  }

  async getRecommendationPagesPreview() {
    const mostRecent = await this.pageRepo.find({
      order: { createdAt: 'DESC' },
    });
    const mostRated = await this.pageRepo
      .createQueryBuilder('page')
      .innerJoinAndSelect('page.comments', 'comments')
      .orderBy('comments', 'DESC')
      .getMany();
    return { mostRecent, mostRated };
  }
}
