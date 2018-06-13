import axios from "axios";
import { Enum } from "../enum";
import { TaxModel } from "../model/tax.model";
import { IGenericAction, Success } from "../util";

export const calcualteTaxRequest: IGenericAction<TaxModel> = (taxModel: TaxModel) => {
    return {
        type: Enum.CALCULATE_TAX_REQUEST,
        Payload: taxModel,
        Error: ""
    };
};

const calcualteTaxSuccess: IGenericAction<TaxModel[]> = (taxModel: TaxModel[]) => {
    return {
        type: Enum.CALCULATE_TAX_SUCCESS,
        Payload: taxModel,
        Error: ""
    };
};

const calcualteTaxError: IGenericAction<TaxModel> = (taxModel: TaxModel, error: string = "") => {
    return {
        type: Enum.CALCULATE_TAX_SUCCESS,
        Payload: taxModel,
        Error: error
    };
};

const calculateTaxStateUpdate: IGenericAction<TaxModel> = (taxModel: TaxModel, error: string = "") => {
    return {
        type: Enum.CALCULATE_STATE_UPDATE_SUCCESS,
        Payload: taxModel,
        Error: error
    };
};

export const Calculate = (taxModel: TaxModel) => {
    return (dispatch, getState) => {
        dispatch(calcualteTaxRequest(taxModel));
        return axios.post("api/tax", taxModel).then(response => {
            if (response.data.Status.Code === 200) {
                const taxList = getState().TaxList.Payload;
                taxList.push(response.data.Data);
                Success("Calculeted Successfully");
                return dispatch(calcualteTaxSuccess(taxList));
            } else {
                return dispatch(calcualteTaxError(taxModel, response.data.Status.Message));
            }
        }).catch(error => {
            return dispatch(calcualteTaxError(taxModel, error));
        });
    };
};

export const updateProperties = (taxModel: TaxModel) => {
    return (dispatch, getState) => {
        dispatch(calculateTaxStateUpdate(taxModel));
    };
};