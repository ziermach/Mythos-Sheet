import { IPC, SendChannels } from "@el3um4s/ipc-for-electron";

import { app, BrowserWindow } from "electron";
import { access, writeFile, mkdir, readFile, readdir } from "fs/promises";
import path from "path";
import { Character } from "../model/character";

const nameAPI = "fileSystem";
const dirName = 'characters';

// to Main
const validSendChannel: SendChannels = {
    saveCharacter: saveCharacter,
    listCharacterNames: listCharacterNames,
    readCharacter: readCharacter,
};

// from Main
const validReceiveChannel: string[] = ["saveCharacter", "listCharacterNames", "readCharacter"];

const fileSystem = new IPC({
    nameAPI,
    validSendChannel,
    validReceiveChannel,
});

export default fileSystem;


async function readCharacter(
    mainWindow: BrowserWindow,
    event: Electron.IpcMainEvent,
    data: { name: string }
) {
    const fileName = `${data.name}.json`;
    const fileExists = await checkFileCharactersExists(fileName);
    if (!fileExists) {
        return ``;
    }
    const character = await loadCharacter(fileName);
    mainWindow.webContents.send("readCharacter", character);
}


async function listCharacterNames(
    mainWindow: BrowserWindow,
    event: Electron.IpcMainEvent,
) {
    const names = await listCharacters();
    console.log(names);
    mainWindow.webContents.send("listCharacterNames", names);
}

async function saveCharacter(
    mainWindow: BrowserWindow,
    event: Electron.IpcMainEvent,
    data: { character: string }
) {
    const character = JSON.parse(data.character) as Character;
    const fileName = `${character.name}.json`;
    const fileExists = await checkFileCharactersExists(fileName);
    if (!fileExists) {
        await createDir();
    }
    console.debug(`start write`);
    await writeCharacter(fileName, character);

}

async function checkFileCharactersExists(fileName: string) {
    const userData = app.getPath("userData");
    const pathFile = path.join(userData, dirName, fileName);
    console.debug("pathFile", pathFile)
    try {
        await access(pathFile);
        return true;
    } catch (error) {
        console.error("DOES NOT exist:", pathFile);
        console.error(error);
        return false;
    }
}

async function writeCharacter(fileName: string, data: Character) {
    const userData = app.getPath("userData");
    const pathFile = path.join(userData, dirName, fileName);
    try {
        console.debug(`write ${fileName} to ${pathFile}`)
        await writeFile(pathFile, JSON.stringify(data));
    } catch (error) {
        console.error("await writeFile(pathFile, data);", pathFile);
        console.error(error);
    }
}

async function listCharacters() {
    const userData = app.getPath("userData");
    const pathDir = path.join(userData, dirName);
    try {
        return await (await readdir(pathDir)).map(path => path.replace('.json', ''));
    } catch (err) {
        console.error(err);
    }
}

async function loadCharacter(fileName: string) {
    const userData = app.getPath("userData");
    const pathDir = path.join(userData, dirName, fileName);
    let result = [];
    try {
        const rawData = await readFile(pathDir, "utf-8");
        result = JSON.parse(rawData);
    } catch (err) {
        console.error(err);
    }

    return result;
}

async function createDir() {
    const userData = app.getPath("userData");
    const pathDir = path.join(userData, dirName);
    let dirExists = false;
    console.debug(`check if ${pathDir} exists`);
    try {
        await access(pathDir);
        console.debug(`${pathDir} exists`);
        dirExists = true;
    } catch (error) {
        // The check failed
        console.error("DOES NOT exist:", pathDir);
        console.error(error);
        dirExists = false;
    }
    if (!dirExists) {
        console.debug("create dir", pathDir);
        try {
            await mkdir(pathDir);
        } catch (error) {
            console.error(" await mkdir(pathDir);", pathDir);
            console.error(error);
        }
    }
}