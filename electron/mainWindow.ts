

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

            loading.once("show", async () => {
                console.log('this.settingsDev.isInProduction', this.settingsDev.isInProduction);
                this.window = await this.createWindow();
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

    async createWindow() {
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
            },
        });

        try {
            await window.loadFile(path.join(__dirname, "index.html"));

            // await window.loadURL(`file://${__dirname}/index.html`);
        } catch (error) {
            console.log(`window.loadURL('file://${__dirname}/index.html');`);
            console.log(error);
        }

        window.show();
        if (!this.settingsDev.isInProduction) {
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
            console.log('this.settingsDev.isInProduction', this.settingsDev.isInProduction)
            this.createWindow();
        }
    }
}

export default Main;