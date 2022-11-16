

import systemInfo from "@el3um4s/ipc-for-electron-system-info";
import { app, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import EventEmitter from "events";
import path from "path";
import { ConfigureDev, DeveloperOptions } from "./configureDev";
import fileSystem from "./IPC/fileSystem";
import pdfGenerator from "./IPC/pdf";
import updaterInfo from "./IPC/updaterInfo";

const appName = "MEMENTO - SvelteKit, Electron, TypeScript";

const defaultSettings = {
    title: "MEMENTO - SvelteKit, Electron, TypeScript",
    width: 854,
    height: 480,
};

const defaultSettingsDev: DeveloperOptions = {
    isInProduction: true, // true if is in production
    serveSvelteDev: false, // true when you want to watch svelte
    buildSvelteDev: false, // true when you want to build svelte
    watchSvelteBuild: false, // true when you want to watch build svelte
    port: 5174
};

class Main {
    window!: BrowserWindow;
    settings: { [key: string]: any };
    onEvent: EventEmitter = new EventEmitter();
    settingsDev: DeveloperOptions;
    configDev: ConfigureDev;

    constructor(
        settings: { [key: string]: any } | null = null,
        settingsDev: DeveloperOptions | null = null
    ) {
        this.settings = settings ? { ...settings } : { ...defaultSettings };
        this.settingsDev = settingsDev
            ? { ...settingsDev }
            : { ...defaultSettingsDev };

        this.configDev = new ConfigureDev(this.settingsDev);

        app.on("ready", async () => {
            const loading = new BrowserWindow({
                show: false,
                frame: false,
                width: 300,
                height: 300,
                transparent: true,
            });

            loading.once("show", async () => {
                console.log("show", this.settingsDev.isInProduction);
                this.settingsDev.isInProduction = this.settingsDev.isInProduction || true;
                this.window = await this.createWindow(!this.settingsDev.isInProduction);
                this.onEvent.emit("window-created");
                loading.hide();
                loading.close();
            });
            loading.loadURL(path.join(__dirname, "www", "loading.html"));
            loading.show();
        });

        app.on("window-all-closed", this.onWindowAllClosed);
        app.on("activate", this.onActivate);
    }

    async createWindow(prod = false) {
        const settings = { ...this.settings };
        app.name = appName;
        const window = new BrowserWindow({
            ...settings,
            show: false,
            icon: __dirname + '/assets/favicon.ico',
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: false,
                preload: path.join(__dirname, "preload.js"),
            },
        });
        systemInfo.initIpcMain(ipcMain, window);
        updaterInfo.initIpcMain(ipcMain, window);
        fileSystem.initIpcMain(ipcMain, window);
        pdfGenerator.initIpcMain(ipcMain, window);

        try {
            await window.loadFile(path.join(__dirname, "index.html"));
        } catch (error) {
            console.log(`window.loadURL('file://${__dirname}/index.html');`);
            console.log(error);
        }

        window.show();
        console.log(prod)
        if (!prod) {
            window.webContents.openDevTools();
        }

        return window;
    }

    onWindowAllClosed() {
        if (process.platform !== "darwin") {
            app.quit();
        }
    }

    onActivate() {
        if (!this.window) {
            console.log("show", this.settingsDev.isInProduction);
            this.settingsDev.isInProduction = this.settingsDev.isInProduction || true;
            this.createWindow(!this.settingsDev.isInProduction);
        }
    }
}

export default Main;