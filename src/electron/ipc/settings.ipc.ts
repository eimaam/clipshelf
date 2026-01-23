import { app, ipcMain } from "electron"
import { IPC } from "../../shared/ipc.channels"
import { SettingsStore } from "../store/settings.store"
import { IClipboardSettings } from "../types/clipboard.types"


export const resgisterSettingsIpc = () => {
    ipcMain.handle(IPC.SETTINGS_GET, () => {
        console.log("settings ipc")
        return SettingsStore.getSettings()
    }),
    ipcMain.handle(IPC.SETTINGS_SET, (_event, key: keyof IClipboardSettings, value: IClipboardSettings[keyof IClipboardSettings]) => {
        SettingsStore.setSetting(key, value)
    }),

    ipcMain.on(IPC.SETTINGS_SUBSCRIBE, event => {

        const unsubscribe = SettingsStore.onChange((settings) => {
            console.log(`[IPC] Sending SETTINGS UNSUBSCRIBE update. Settings: ${settings}}`)
            event.sender.send(IPC.SETTINGS_SUBSCRIBE, settings)
        })
            // unsubscribe when the renderer process is destroyed
        event.sender.once("destroyed", () => {
            unsubscribe()
        })
    })

    ipcMain.on(IPC.APP_QUIT, () => {
        app.quit()
    })
}