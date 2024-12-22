import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  name: string;
}
