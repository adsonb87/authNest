import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSerivce: UsersService,
    private JjwtService: JwtService,
  ) {}

  //Validar usuário
  async validarUsuario(username: string, password: string): Promise<any> {
    const user = await this.usersSerivce.findOneByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }
    if (user.password === password) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException('Usuário ou Senha Inválidos');
  }

  async gerarToken(payload: user) {
    return {
      acess_token: this.JjwtService.sign(
        { email: payload.email },
        {
          secret: 'topSecret512',
          expiresIn: '50s',
        },
      ),
    };
  }
}
