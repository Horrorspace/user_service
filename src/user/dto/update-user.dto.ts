export class UpdateUserDto {
    public readonly login?: string;
    public readonly email?: string;
    public readonly password?: string;
    public readonly phone?: string;
    public readonly confirmationCode?: string | null;
    public readonly confirmed?: boolean;
}
