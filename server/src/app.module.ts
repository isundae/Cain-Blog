import { Module } from '@nestjs/common';
import { DbModule } from 'libs/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiresultModule } from './apiresult/apiresult.module';
import { TagsModule } from './tags/tags.module';
import { BlogsModule } from './blogs/blogs.module';
import { MulterModule } from '@nestjs/platform-express';
import { LinksModule } from './links/links.module';
import { AuthModule } from './auth/auth.module';
const MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    DbModule,
    ApiresultModule,
    TagsModule,
    BlogsModule,
    MulterModule.register({
      storage: MAO({
        config: {
          region: 'oss-cn-hangzhou',
          accessKeyId: 'LTAI5tEjqEHnuoXUHfeeSyee',
          accessKeySecret: 'qVf7psgzGSZ4txmOv9ShNl2JfxHwmF',
          bucket: 'caintest',
        },
      }),
    }),
    LinksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
