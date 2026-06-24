export class AccountEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public team: string,
    public active: boolean,
  ) {}
}
