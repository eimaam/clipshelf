import { app, ipcMain } from "electron"
import { IPC } from "../../shared/ipc.channels"
import { SettingsStore } from "../store/settings.store"
import { IClipboardSettings } from "../types/clipboard.types"


export const resgisterSettingsIpc = () => {
    ipcMain.handle(IPC.SETTINGS_GET, () => {
        console.log("settings ipc")
        return SettingsStore.getSettings()
    })
    ipcMain.handle(IPC.SETTINGS_SET, (_event, key: keyof IClipboardSettings, value: IClipboardSettings[keyof IClipboardSettings]) => {
        SettingsStore.setSetting(key, value)
    })

    ipcMain.on(IPC.APP_QUIT, () => {
        app.quit()
    })
}