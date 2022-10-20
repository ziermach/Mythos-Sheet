import { ProfessionEnum, type Profession } from "../model/character";
import { EyeForDetails, Forensics, PoliceConnection, Shadow } from "./special-moves";

export const Professions = new Map<ProfessionEnum, Profession>([
    [ProfessionEnum.INVESTIGATOR, {
        name: ProfessionEnum.INVESTIGATOR,
        description: "Whether you work for the police, a government agency or a private detective agency detective agency, your job is to spot the clues that others that others don't see and to connect them. and connect them.You could be hired to, to find missing persons, keep tabs on suspicious characters... or solve a crime.",
        professionMoves: {
            starter: [{ ...EyeForDetails, active: true }, { ...Shadow, active: true }],
            available: [PoliceConnection, Forensics]
        },
        importantAttributes: {
            intelligence: true
        }
    }]
]);