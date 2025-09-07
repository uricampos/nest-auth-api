import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as auth from './dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: auth.SignUpDTO) {
    await this.authService.signup(body);

    return body;
  }

  @Post('signin')
  async signin(@Body() body: auth.SingInDTO) {
    await this.authService.signin(body);

    return body;
  }
}
