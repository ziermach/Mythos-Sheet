import path from "path";
import serve from "electron-serve";
import { exec } from "child_process";

export interface DeveloperOptions {
    isInProduction: boolean;
    serveSvelteDev: boolean;
    buildSvelteDev: boolean;
    watchSvelteBuild: boolean;
    port: number;
}

export class ConfigureDev {
    isInProduction: boolean;
    serveSvelteDev: boolean;
    buildSvelteDev: boolean;
    watchSvelteBuild: boolean;
    port: number;
    loadURL: any;

    constructor(settings: DeveloperOptions) {
        this.isInProduction = settings.isInProduction
        this.serveSvelteDev = settings.serveSvelteDev
        this.buildSvelteDev = settings.buildSvelteDev
        this.watchSvelteBuild = settings.watchSvelteBuild
        this.port = settings.port
        this.loadURL = null;

        if (!this.isInProduction) this._build_Dist();
        if (!this.isInProduction) this._watch_Dist();
        if (this.isInProduction || !this.serveSvelteDev) this._serve_Dist();
    }

    _dev_Svelte() {
        exec("npm run svelte:dev");
        require("electron-reload")(path.join(__dirname, "..", "svelte"));
    }
    _build_Dist() {
        exec("npm run svelte:build");
        require("electron-reload")(path.join(__dirname, "..", "svelte")
        );
    }
    _watch_Dist() { require("electron-reload")(path.join(__dirname, "www")); }
    _serve_Dist() {
        this.loadURL = serve({ directory: "dist/www" });
    }

    isLocalHost() { return this.serveSvelteDev; }
    isElectronServe() { return !this.serveSvelteDev; }

}
