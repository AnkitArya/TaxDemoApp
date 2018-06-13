import * as React from "react";
import { Link } from "react-router-dom";

export const AddTax = (props) => {
    const Valid = (key) => (props.inValidKeys.indexOf(key) === -1);
    return (
        <form>
            <div className={"form-group " + (Valid("FirstName") ? "" : "has-error")}>
                <label>First Name</label>
                <input type="text" className="form-control" name="FirstName" value={props.taxState.FirstName} onChange={props.handleChange} />
                {!Valid("FirstName") && <div className="help-block">
                    Please provide a valid First Name.
      </div>}
            </div>

            <div className={"form-group " + (Valid("LastName") ? "" : "has-error")}>
                <label>Last Name</label>
                <input type="text" className="form-control" name="LastName" value={props.taxState.LastName} onChange={props.handleChange} />
                {!Valid("FirstName") && <div className="help-block">
                    Please provide a valid Last Name.
      </div>}
            </div>

            <div className={"form-group " + (Valid("AnnualSalary") ? "" : "has-error")}>
                <label>Annual Salary</label>
                <input type="number" className="form-control" name="AnnualSalary" value={props.taxState.AnnualSalary} onChange={props.handleChange} />
                {!Valid("AnnualSalary") && <div className="help-block">
                    Annual Salary should be greater than 0.
      </div>}
            </div>
            <div className={"form-group " + (Valid("SuperRate") ? "" : "has-error")}>
                <label>Super Rate</label>
                <input type="number" className="form-control" name="SuperRate" value={props.taxState.SuperRate} onChange={props.handleChange} />
                {!Valid("SuperRate") && <div className="help-block">
                    Super Rate should be greater than 0.
      </div>}
            </div>

            <div className={"form-group " + (Valid("PaymentStartDate") ? "" : "has-error")}>
                <label>Payment Start Date</label>
                <input type="text" className="form-control" name="PaymentStartDate" value={props.taxState.PaymentStartDate} onChange={props.handleChange} />
                {!Valid("PaymentStartDate") && <div className="help-block">
                    Please provide a valid Payment Start Date.
      </div>}
            </div>

            <div className="form-group">
                <button type="button" className="btn btn-primary btn-lg" onClick={props.submit}>
                    Calculate
                             </button>
            </div>
        </form >
    );
};