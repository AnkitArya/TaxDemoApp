import notie from "notie";

import appConfig from "../app.config";
export const Error = (text: string) => notie.alert({ type: "error", text, time: appConfig.notieTime });

export const Success = (text: string) => notie.alert({ type: "success", text, time: appConfig.notieTime });
