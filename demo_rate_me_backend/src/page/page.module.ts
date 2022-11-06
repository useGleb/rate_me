import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageEntity } from './page.entity';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity, CategoryEntity])],
  controllers: [PageController],
  providers: [PageService, CategoryService],
  exports: [PageModule],
})
export class PageModule {}
