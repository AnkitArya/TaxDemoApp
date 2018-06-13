import { GenericReducerState } from "../util";
import { TaxModel } from "./tax.model";
export { TaxModel } from "./tax.model";

export interface IAppState {
    TaxList: GenericReducerState<TaxModel[]>;
    Tax: GenericReducerState<TaxModel>;
}