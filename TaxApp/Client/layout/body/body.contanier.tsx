import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { routes } from "../../route.config";
import { Body } from "./body";

export class BodyContainer extends React.Component {
    public render() {
        const Routes: any[] = routes.map((x, i) => <Route key={i} path={x.Path} exact={true} component={x.Component} />);
        return (<div>
            <Body><Switch>
                {Routes}
                <Redirect to="/" />
            </Switch></Body>
        </div>);
    }
}