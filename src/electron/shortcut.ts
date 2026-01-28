import { globalShortcut } from "electron"
import { Menubar } from "menubar"
import { SettingsStore } from "./store/settings.store"


let currentShortcut: string | null = null

export const registerGlobalShortcut = (menubar: Menubar) => {

    const register = (shortcut: string) => {
        if (!shortcut) return

        // unregister old if exists
        try {
            if (currentShortcut) {
                globalShortcut.unregister(currentShortcut)
            }

            // register new
            const ret = globalShortcut.register(shortcut, () => {
                if (menubar.window?.isVisible()) {
                    menubar.hideWindow()
                } else {
                    menubar.showWindow()
                }
            })

            if (!ret) {
                console.error(`[Shortcut] Registration failed for ${shortcut}`)
                currentShortcut = null 
            } else {
                console.log(`[Shortcut] registered global shortcut: ${shortcut}`)
                currentShortcut = shortcut
            }

        } catch (error) {
            console.error(`[Shortcut] failed to register shortcut`, error)
        }
    }

    // initial registration
    const settings = SettingsStore.getSettings()
    register(settings.globalShortcut)

    // listen for changes
    SettingsStore.onChange((newSettings) => {
        if (newSettings.globalShortcut !== currentShortcut) {
            register(newSettings.globalShortcut)
        }
    })
}

export const unregisterGlobalShortcuts = () => {
    globalShortcut.unregisterAll()
}
