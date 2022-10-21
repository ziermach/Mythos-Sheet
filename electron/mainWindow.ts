

import { app, BrowserWindow } from "electron";
import EventEmitter from "events";
import path from "path";
import { ConfigureDev, DeveloperOptions } from "./configureDev";

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

            // this.window = await this.createWindow();
            // this.onEvent.emit("window-created");

            loading.once("show", async () => {
                this.window = await this.createWindow(!this.settings.isInProduction);
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

    async createWindow(dev = false) {
        const settings = { ...this.settings };
        app.name = appName;
        const window = new BrowserWindow({
            ...settings,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                sandbox: false,
                preload: path.join(__dirname, "preload.js"),
                devTools: dev,
            },
        });

        try {
            await window.loadFile(path.join(__dirname, "index.html"));

            // await window.loadURL(`file://${__dirname}/index.html`);
        } catch (error) {
            console.log(`window.loadURL('file://${__dirname}/index.html');`);
            console.log(error);
        }

        // if (this.configDev.isLocalHost()) {
        //     try {
        //         await window.loadURL(`http://localhost:${this.settingsDev.port}/`);
        //     } catch (error) {
        //         console.log(`ERROR: window.loadURL("http://localhost:${this.settingsDev.port}/");`);
        //         console.log(error);
        //     }
        // } else if (this.configDev.isElectronServe()) {
        //     try {
        //         await this.configDev.loadURL(window);
        //     } catch (error) {
        //         console.log(`this.configDev.loadURL(window);`);
        //         console.log(error);
        //     }
        // }

        window.show();
        if (dev) {
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
            this.createWindow();
        }
    }
}

export default Main;