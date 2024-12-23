import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';

export class LoginUserDto extends UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
