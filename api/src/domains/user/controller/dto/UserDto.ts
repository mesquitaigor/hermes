import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
