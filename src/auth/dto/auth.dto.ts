import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { ROLES } from "src/auth/role-enum";

export class AuthDto {
  @IsString({message: 'Email must be a string'})
  @IsNotEmpty({message: 'Email is required'})
  @IsEmail({}, {message: 'Invalid email'})
  email: string;

  @IsString({message: 'Password must be a string'})
  @IsNotEmpty({message: 'Password is required'})
  @Length(8, 64, {message: 'Password must be 64 characters long'})
  password: string;

  @IsString({message: 'Role must be a string'})
  @IsNotEmpty({message: 'Role is required'})
  @IsEnum(ROLES, {message: 'Invalid role'})
  role: ROLES;

  constructor(email?: string, password?: string, role?: ROLES) {
    this.email = email;
    this.password = password;
    this.role = role || ROLES.USER;
  }
}