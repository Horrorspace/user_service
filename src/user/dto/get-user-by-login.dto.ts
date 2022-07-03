import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GetUserByLoginDto extends PickType(CreateUserDto, [
    'login',
] as const) {}
