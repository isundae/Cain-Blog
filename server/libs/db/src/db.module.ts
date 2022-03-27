import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entitys/user.entity';
import { Tag } from './Entitys/tag.entity';
import { Blog } from './Entitys/blog.entity';
import { Link } from './Entitys/link.entity';
import { AdminUser } from './Entitys/Adminuser.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
const Entity = TypeOrmModule.forFeature([User, Tag, Blog, Link, AdminUser]);

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'xiaoxiwen',
      database: 'cain-test',
      entities: [User, Tag, Blog, Link, AdminUser],
      synchronize: true,
    }),
    Entity,
    JwtModule.register({
      secret: 'xxaiasasdsasasadasdasdasdassadaas',
    }),
  ],
  providers: [DbService],
  exports: [DbService, Entity, JwtModule],
})
export class DbModule {}
