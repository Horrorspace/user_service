import { CreateUserDto } from '../../dto/create-user.dto';

export class CreateUserByEmailCommand {
    constructor(public readonly userDto: CreateUserDto) {}
}
