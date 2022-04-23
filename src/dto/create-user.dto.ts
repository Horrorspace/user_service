export class CreateUserDto {
    public readonly login: string;
    public readonly email: string;
    public readonly password: string;
    public readonly phone: string | null;
}
