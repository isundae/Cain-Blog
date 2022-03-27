import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { AdminUser } from 'libs/db/Entitys/Adminuser.entity';
import { getManager } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(private jwtservice: JwtService) {}
  @Post('register')
  async register(@Body() body: AdminUser) {
    body.adminpass = hashSync(body.adminpass);

    const user = await getManager()
      .createQueryBuilder(AdminUser, 'adminuser')
      .where({
        adminuser: body.adminuser,
      })
      .getOne();
    if (user) {
      return {
        message: '账号已被注册',
      };
    }
    const data = await getManager()
      .createQueryBuilder()
      .insert()
      .into(AdminUser)
      .values(body)
      .execute();
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req) {
    return {
      token: this.jwtservice.sign(String(req.user.id)),
    };
  }

  @Post('findone')
  @UseGuards(AuthGuard('jwt'))
  async findone(@Req() req) {
    return req.user;
  }
}
