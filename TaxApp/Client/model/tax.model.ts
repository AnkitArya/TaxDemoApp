import { UserModel } from "./user.model";

export class TaxModel extends UserModel {
    public GrossIncome: number = 1;
    public IncomeTax: number = 1;
    public NetIncome: number = 1;
    public SuperAmount: number = 1;
}