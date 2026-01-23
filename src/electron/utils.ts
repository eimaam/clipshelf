import { app } from "electron"
import path from "path";


export const isDev = () => {
    return process.env.NODE_ENV === "development"
}

export const getPreloadPath = () => {
    return path.join(
        app.getAppPath(),
        isDev() ? "." : ".",
        "/out/preload/index.cjs"
    )
}