import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
