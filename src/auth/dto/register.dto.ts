import { IsEmail, IsString, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'test@gmail.com', description: "L'email de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test123', description: 'Le mot de passe (min 6 caractères)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'user', description: "Le rôle de l'utilisateur (user/admin)", required: false, default: 'user' })
  @IsOptional() 
  @IsIn(['user', 'admin']) 
  role?: string; 
}
