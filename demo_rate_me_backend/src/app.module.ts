import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageModule } from './page/page.module';
import { RouterModule } from '@nestjs/core';
import { FeedbackModule } from './feedback/feedback.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
console.log(join(__dirname, '..', '/public'));
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'localuser',
      database: 'demo_rate_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RouterModule.register([
      {
        path: 'page',
        module: PageModule,
      },
      {
        path: 'feedback',
        module: FeedbackModule,
      },
    ]),
    PageModule,
    FeedbackModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),
      serveRoot: '/public/',
    }),
  ],
})
export class AppModule {}
