
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Calculate, updateProperties } from "../../action/tax.action";
import { IAppState, TaxModel } from "../../model";
import { GenericReducerState } from "../../util";
import { AddTax } from "./add";
import { TaxList } from "./list";

export class TaxContainer extends React.Component<any & RouteComponentProps<{}>, any> {
    private InValidKeys: string[] = [];
    constructor(params) {
        super(params);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    public handleChange(e) {
        const { name, value } = e.target;
        this.props.taxState.Payload[name] = value;
        this.ValidState(this.props.taxState.Payload);
        this.props.dispatch(updateProperties(this.props.taxState.Payload));
    }

    public submit() {
        if (this.ValidState(this.props.taxState.Payload)) {
            this.props.dispatch(Calculate(this.props.taxState.Payload));
        } else {
            this.props.dispatch(updateProperties(this.props.taxState.Payload));
        }
    }

    public ValidState(payload) {
        const keys = Object.keys(payload);
        this.InValidKeys = keys.filter(x => !payload[x]);
        return this.InValidKeys.length === 0;
    }

    public render() {
        const taxModel = {
            taxState: this.props.taxState.Payload,
            handleChange: this.handleChange,
            submit: this.submit,
            inValidKeys: this.InValidKeys
        };

        const taxListModel = {
            taxListState: this.props.taxListState.Payload
        };

        return (<div>
            <div className="row">
                <AddTax {...taxModel} />
            </div>
            <div className="row">
                <TaxList {...taxListModel} />
            </div>
        </div>);
    }
}

interface IConnectState {
    taxListState: GenericReducerState<TaxModel[]>;
    taxState: GenericReducerState<TaxModel>;
}

const mapStateToProps = (state: IAppState): IConnectState => ({
    taxListState: state.TaxList,
    taxState: state.Tax
});

interface IConnectDispatch {
    dispatch: any;
}

export default connect(mapStateToProps)(TaxContainer);
