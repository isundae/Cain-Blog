import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { getManager } from 'typeorm';
import { AdminUser } from 'libs/db/Entitys/Adminuser.entity';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'adminuser',
      passwordField: 'adminpass',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const data = await getManager()
      .createQueryBuilder(AdminUser, 'adminuser')
      .where('adminuser=:username', {
        username: username,
      })
      .addSelect('adminuser.adminpass')
      .getOne();
    if (!data) {
      throw new BadRequestException('用户名或密码错误！');
    }

    if (!compareSync(password, data.adminpass)) {
      throw new BadRequestException('用户名或密码错误！');
    }
    delete data.adminpass;
    return data;
  }
}
