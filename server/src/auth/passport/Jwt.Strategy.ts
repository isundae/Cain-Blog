import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { getManager } from 'typeorm';
import { AdminUser } from 'libs/db/Entitys/Adminuser.entity';
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'xxaiasasdsasasadasdasdasdassadaas'
    } as StrategyOptions);
  }

  async validate(id) {
    const data = await getManager()
      .createQueryBuilder(AdminUser, 'adminuser')
      .where('id=:id', {
        id: id,
      })
      .getOne();
    return data;
  }
}
