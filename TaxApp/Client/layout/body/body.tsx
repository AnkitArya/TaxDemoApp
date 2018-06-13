import * as React from "react";
export const Body = (props) => {
    return ((
        <div className="container">
            <div className="row">
                {props.children}
            </div>
        </div>
    ));
};