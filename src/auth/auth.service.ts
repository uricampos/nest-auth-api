import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import { comparePassword, hashPassword } from 'src/utils/password';
import { PrismaService } from '../prisma/prisma.service';
import * as auth from './dtos/auth';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
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
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const passwordMatch = await comparePassword(user.password, data.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      accessToken,
    };
  }
}
