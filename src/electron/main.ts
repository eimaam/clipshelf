import { app, BrowserWindow, clipboard } from "electron"
import { getPreloadPath, isDev } from "./utils"
import path from "path"
import { menubar } from "menubar"

let mb: any;

// main app
app.whenReady().then(() => {


    // const index = isDev() && process.env['ELECTRON_RENDERER_URL']
    //     ? process.env['ELECTRON_RENDERER_URL']
    //     : `file://${path.join(app.getAppPath(), '/out/renderer/index.html')}`

    // mb = menubar({
    //     index,
    //     icon: path.join(app.getAppPath(), '/resources/clipshelf-icon.png'),
    //     browserWindow: {
    //         width: 320,
    //         height: 600,
    //         show: false,
    //         resizable: false,
    //         webPreferences: {
    //             preload: getPreloadPath(),
    //             contextIsolation: true,
    //             nodeIntegration: false,
    //         }
    //     }
    // })

    // mb.on("ready", () => {
    //     console.log("Menubar is ready")
    // })

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // show: false,
        // resizable: false,
        webPreferences: {
            preload: getPreloadPath(),
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    if (isDev() && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), 'out/renderer/index.html'))
    }

    

})