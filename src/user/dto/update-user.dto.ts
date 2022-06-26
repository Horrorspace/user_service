import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['login', 'email', 'password'] as const),
) {
    @IsString()
    public readonly login: string;

    @IsString()
    @IsOptional()
    public readonly confirmationCode?: string | null;

    @IsBoolean()
    public readonly confirmed?: boolean;
}
