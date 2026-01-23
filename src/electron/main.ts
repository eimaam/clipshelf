import { app, BrowserWindow, clipboard } from "electron"
import { getPreloadPath, isDev } from "./utils"
import path from "path"
import renderTray from "./tray/tray";
import { clipboardListener } from "./clipboard/clipboard-listener";
import { resgisterSettingsIpc } from "./ipc/settings.ipc";
import { registerClipboardIpc } from "./ipc/clipboard.ipc";


const startupHandler = () => {

    // hide dock icon
    app.dock?.hide()

    const appLoginSettings = app.getLoginItemSettings()
    const launchedAtLogin = appLoginSettings.wasOpenedAtLogin

    // configure app launch on startup
    // allow adding app to mac login items (auto)
    app.isPackaged ?
        app.setLoginItemSettings({
            openAtLogin: true,
            path: app.getPath('exe'),
            args: [],
            openAsHidden: true
        })
        :
        app.setLoginItemSettings({
            openAtLogin: true,
            openAsHidden: true
        })

    // add delay if app was launched at login
    // to avoid macOS kill on the execution...
    if (launchedAtLogin) {
        setTimeout(() => {
            app.dock?.hide()
        }, 800)
    }

}

// main
app.whenReady().then(() => {

    // handle events when app is starting...
    startupHandler()

    // start listening
    clipboardListener()

    // render tray
    const menubar = renderTray()

    menubar.on("ready", () => {
        console.log("Menubar is ready")
    })

    

    // register ipcs
    resgisterSettingsIpc()
    registerClipboardIpc()



})