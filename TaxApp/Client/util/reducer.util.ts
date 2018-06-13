import { IGenericActionReturn } from "./action.util";
export class GenericReducerState<T> {
    public Payload: T;
    public Fetching: boolean = false;
    public Error: string = "";
    constructor(model: T) {
        this.Payload = model;
    }
}

export type IGenericReducer<T> = (state: GenericReducerState<T>, action: IGenericActionReturn<T>) => GenericReducerState<T>;
