import { UpdateUserDto } from '../../dto/update-user.dto';

export class UpdateUserByLoginCommand {
    constructor(public readonly userDto: UpdateUserDto) {}
}
