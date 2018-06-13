import { Enum } from "../enum";

export interface IGenericActionReturn<T> {
    type: Enum;
    Payload: T;
    Error?: string;
}

export type IGenericAction<T> = (param: T, error?: string) => IGenericActionReturn<T>;