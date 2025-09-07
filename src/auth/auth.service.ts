import { Injectable } from '@nestjs/common';
import * as auth from './dtos/auth';

@Injectable()
export class AuthService {
  async signup(data: auth.SignUpDTO) {
    console.log({ data });
    return 'signup';
  }

  async signin(data: auth.SingInDTO) {
    console.log({ data });
    return 'signin';
  }
}
