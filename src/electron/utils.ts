import { app } from "electron"
import path from "path";
import { IClipboardItem, IPinnedClipboardItem } from "./types/clipboard.types";


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

export const getClipboardSizeInBytes = (clips: IClipboardItem[] | IPinnedClipboardItem[]) => {
    const json = JSON.stringify(clips)
    const size = Buffer.byteLength(json, 'utf-8')
    return size
}