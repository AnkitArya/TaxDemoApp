import { Enum } from "../enum";
import { TaxModel } from "../model/tax.model";
import { GenericReducerState, IGenericReducer } from "../util";

const defaultStateList = new GenericReducerState<TaxModel[]>(new Array<TaxModel>());

export const TaxListReducer: IGenericReducer<TaxModel[]> = (state = defaultStateList, action) => {
    switch (action.type) {
        case Enum.CALCULATE_TAX_REQUEST:
            return { ...state, Fetching: true, Error: "" };
        case Enum.CALCULATE_TAX_SUCCESS:
            return { ...state, Fetching: false, Payload: [...(action.Payload || [])] };
        case Enum.CALCULATE_TAX_ERROR:
            return { ...state, Fetching: false, Error: action.Error || "" };
    }
    return state;
};

const defaultState = new GenericReducerState<TaxModel>(new TaxModel());

export const TaxReducer: IGenericReducer<TaxModel> = (state = defaultState, action) => {
    switch (action.type) {
        case Enum.CALCULATE_TAX_REQUEST:
            return { ...state, Fetching: true, Error: "" };
        case Enum.CALCULATE_STATE_UPDATE_SUCCESS:
            return {
                ...state,
                Fetching: false,
                Payload: { ...action.Payload }
            };
        case Enum.CALCULATE_TAX_ERROR:
            return { ...state, Fetching: false, Error: action.Error || "" };
    }
    return state;
};
