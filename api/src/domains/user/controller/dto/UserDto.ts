import { IsEmail, IsString, Min } from 'class-validator';

export default class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Min(8)
  password: string;
}
