import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PageService } from './page.service';

@Controller()
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fieldNameSize: 28, fileSize: 10000000 },
    }),
  )
  createPage(@Body() data, @UploadedFile() image) {
    return this.pageService.createPage(data, image);
  }

  @Get()
  getRecommendationPagesPreview() {
    return this.pageService.getRecommendationPagesPreview();
  }

  @Get(':id')
  getPage(@Param('id') id) {
    return this.pageService.getPage(id);
  }
}
