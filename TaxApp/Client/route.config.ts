import {
    TaxContainer
} from "./component";

class RouteModel {
    public Path: string = "";
    public Component: any;
    public Name: string = "";
    public protected: boolean = false;
}

export const routes: RouteModel[] = [
    {
        Component: TaxContainer,
        Name: "Tax",
        Path: "/",
        protected: false
    },
];
