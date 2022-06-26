import {
    IsEmail,
    IsString,
    IsMobilePhone,
    MinLength,
    IsOptional,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    public readonly login: string;

    @IsEmail()
    public readonly email: string;

    @IsString()
    @MinLength(9)
    public readonly password: string;

    @IsMobilePhone()
    @IsOptional()
    public readonly phone?: string;
}
