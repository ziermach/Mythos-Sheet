import type { Character } from "./model/character";


export class IPCClient {
    private fileSystem: any;

    constructor() {
        try {
            this.fileSystem = globalThis.ipc.fileSystem;
        } catch (error) {
            console.error(error);
            this.fileSystem = null;
        }
    }


    readCharacter(name: string) {
        return new Promise<Character>((resolve, reject) => {

            try {
                this.fileSystem.send("readCharacter", { name });

                this.fileSystem.receive("readCharacter", (character: Character) => {
                    resolve(character);
                });
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    }

    deleteCharacter(name: string) {
        return new Promise<void>((resolve, reject) => {
            console.debug(`try delete ${name}.json`);
            try {
                this.fileSystem.send("deleteCharacter", { name });

                this.fileSystem.receive("deleteCharacter", () => {
                    resolve();
                });
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
    }

    listCharacterNames() {
        return new Promise<string[]>((resolve, reject) => {
            console.log(this.fileSystem);
            console.debug(`listCharacterNames`)
            try {
                this.fileSystem.send("listCharacterNames");
                this.fileSystem.receive("listCharacterNames", (names: string[]) => {
                    console.debug(`listCharacterNames`, names)
                    resolve(names);
                });
            } catch (e) {
                console.error(e);
                reject(e);
            }
        })
    }

    saveCharacter(character: Partial<Character>) {
        console.debug('saveCharacter', character);
        return new Promise<void>((resolve, reject) => {

            const data = {
                character: JSON.stringify(character),
            };
            try {
                this.fileSystem.send("saveCharacter", data);
                resolve();
            } catch (e) {
                console.error(e);
                reject(e)
            }
        });
    }

}
