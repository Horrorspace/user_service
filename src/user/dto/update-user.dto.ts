import { PickType } from '@nestjs/mapped-types';
// import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto, ['phone'] as const) {
    // @IsString()
    // @IsOptional()
    // public readonly confirmationCode?: string | null;
    // @IsBoolean()
    // public readonly confirmed?: boolean;
}
