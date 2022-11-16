import { IPC, SendChannels } from "@el3um4s/ipc-for-electron";
import { app, BrowserWindow, shell } from "electron";
import { writeFileSync } from "fs";
import { writeFile } from "original-fs";
import path from "path";

const nameAPI = "pdfGenerator";

// to Main
const validSendChannel: SendChannels = {
    printPDF: printPDF,
};

// from Main
const validReceiveChannel: string[] = ["saveCharacter", "listCharacterNames", "readCharacter", "deleteCharacter"];

const pdfGenerator = new IPC({
    nameAPI,
    validSendChannel,
    validReceiveChannel,
});

export default pdfGenerator;

async function printPDF(
    mainWindow: BrowserWindow,
    event: Electron.IpcMainEvent,
    data: { name: string }
) {
    console.debug('called printPDF', data.name);
    const pdfPath = path.join(app.getPath("temp"), `${encodeURIComponent(data.name)}.pdf`);
    try {
        const pdf = await mainWindow.webContents.printToPDF({})
        console.debug('got pdf write pdf to', pdfPath);
        writeFileSync(pdfPath, pdf);
        await shell.openPath(pdfPath);
        event.sender.send("wrote-pdf", pdfPath);

    } catch (err) {
        console.error(err);
    }

}