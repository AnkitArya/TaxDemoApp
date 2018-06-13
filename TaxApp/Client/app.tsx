import { createBrowserHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { BodyContainer } from "./layout";
import { IAppState } from "./model";
import configureStore from "./store";

const baseUrl: any = document
    .getElementsByTagName("base")[0]
    .getAttribute("href")!;
const history: any = createBrowserHistory({ basename: baseUrl }) || "";

// get the application-wide store instance, prepopulating with state from the server where available.
const initialState: any = (window as any)
    .initialReduxState as IAppState || {} as any;
const store: any = configureStore(history, initialState);

const renderApp: any = () =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <BodyContainer />
                </ConnectedRouter>
            </Provider>
        </AppContainer>
        ,
        document.getElementById("root")
    );
renderApp();

// allow Hot Module Replacement
if (module.hot) {
    module.hot.accept("./layout", () => {
        renderApp();
    });
}