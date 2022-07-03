import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class GetUserByEmailDto extends PickType(CreateUserDto, [
    'email',
] as const) {}
