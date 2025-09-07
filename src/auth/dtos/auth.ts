 import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SingInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
