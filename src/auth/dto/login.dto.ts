import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@gmail.com', description: "L'email de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test123', description: 'Le mot de passe' })
  @IsString()
  password: string;
}
