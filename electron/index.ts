

import { app } from "electron";
import { ipcMain } from "electron";
import Main from "./mainWindow";
import globals from "./globals";
import path from "path";
import { pathToFileURL } from "node:url";
import fileSystem from "./IPC/fileSystem";
import systemInfo from "@el3um4s/ipc-for-electron-system-info";
import updaterInfo from "./IPC/updaterInfo";
import { autoUpdater } from "electron-updater";



const env = process.env.NODE_ENV || 'production';
console.log('process.env.NODE_ENV', env);
const mainURLPATH = pathToFileURL(path.join(__dirname, "www", "index.html"));

globals.set.mainURL(mainURLPATH.href);
globals.set.preloadjs(path.join(__dirname, "preload.js"));

app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendArgument("disable-gpu");
app.commandLine.appendSwitch("enable-experimental-web-platform-features");

/*
  testing svelte side: isInProduction: false, serveSvelteDev: true, buildSvelteDev:false, watchSvelteBuild: false
  testing only electron side: isInProduction: true, serveSvelteDev: false, buildSvelteDev:false, watchSvelteBuild: false
  testing both side: isInProduction: true, serveSvelteDev: false, buildSvelteDev:true, watchSvelteBuild: true
*/
const developerOptions = {
  isInProduction: env === 'production', // true if is in production
  serveSvelteDev: false, // true when you want to watch svelte
  buildSvelteDev: true, // true when you want to build svelte
  watchSvelteBuild: false, // true when you want to watch build svelte
  port: 5174
};

const windowSettings = {
  title: "Mythos-Sheet",
  width: 1024,
  height: 1024,
};


const main = new Main(windowSettings, developerOptions);
