import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'generated/prisma';
import { hashPassword } from 'src/utils/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import * as auth from './dtos/auth';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async signup(data: auth.SignUpDTO) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    const user = (await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })) as User | null;

    console.log({ data });
    return user;
  }

  async signin(data: auth.SingInDTO) {
    console.log({ data });
    return 'signin';
  }
}
