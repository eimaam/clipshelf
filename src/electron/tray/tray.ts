import { app } from "electron"
import {menubar} from "menubar"
import path from "path"
import { isDev } from "../utils"
import { getPreloadPath } from "../utils"


let mb: any;

const renderTray = () => {
      const index = isDev() && process.env['ELECTRON_RENDERER_URL']
        ? process.env['ELECTRON_RENDERER_URL']
        : `file://${path.join(app.getAppPath(), '/out/renderer/index.html')}`

    mb = menubar({
        index,
        icon: path.join(app.getAppPath(), '/resources/clipshelf-icon.png'),
        preloadWindow: true,
        browserWindow: {
            width: 320,
            height: 600,
            show: false,
            resizable: false,
            webPreferences: {
                preload: getPreloadPath(),
                contextIsolation: true,
                nodeIntegration: false,
                sandbox: false
            }
        }
    })

    mb.on("ready", () => {
        mb.tray.setTitle("✍️")
    })

    return mb
}

export default renderTray;