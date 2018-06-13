import * as React from "react";
export const TaxList = (props) => {
    let taxList: any = [];

    taxList = props.taxListState.map((item, i) => {
        return (
            <tr key={i}>
                <td>{item.FirstName + " " + item.LastName}</td>
                <td>{item.PaymentStartDate}</td>
                <td>{item.GrossIncome}</td>
                <td>{item.IncomeTax}</td>
                <td>{item.NetIncome}</td>
                <td>{item.SuperAmount}</td>
            </tr>);
    });
    return (
        <div>
            <h1>Tax  </h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Pay-Period</th>
                        <th>Gross-Income</th>
                        <th>Income-Tax</th>
                        <th>Net-Income</th>
                        <th>Super-Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {taxList.length > 0 ? taxList : <tr><td colSpan={7}> <div className="no-result"> <h3>No result found</h3></div></td></tr>}
                </tbody>
            </table>
        </div>
    );
};