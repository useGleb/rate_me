import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RateRequestBody } from './feedback.interface';
import { FeedbackService } from './feedback.service';

@Controller()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post(':id')
  rate(@Param('id') id, @Body() data: RateRequestBody) {
    return this.feedbackService.rate({ id: +id }, data);
  }

  @Get(':id')
  getComments(@Param('id') id) {
    return this.feedbackService.getComments({ id: +id });
  }
}
