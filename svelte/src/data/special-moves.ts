import type { GameMove } from "../model/character";

export const EyeForDetails: GameMove = {
    active: false,
    description: "You notice what others miss. When you look for something with a 7+, you get an additional an additional clue that no one else has noticed - even if they had already searched thoroughly.",
    name: "Eye for details"
}

export const Shadow: GameMove = {
    active: false,
    description: "You are very skilled at following others unnoticed. If you secretly follow a person on foot person on foot for a while, he or she will not notice you and you can use the move Detect Truth to find out something about them.",
    name: "Shadow"
}
export const Forensics: GameMove = {
    active: false,
    description: "You have a small laboratory where you can compare fingerprints, look at evidence under the microscope and carry out simple chemical tests. microscope and carry out simple chemical tests. When you examine a piece of When you examine a piece of evidence in your lab, roll + IN. * A 10+ will give you useful information.  * If you roll a 7-9, you also get a useful piece of information, but you have to choose 2:  E You have used up an expensive resource. You destroyed the evidence during the investigation.  While you were concentrating on the investigation, you missed something important.  something important. Possession of the evidence puts you or your allies in danger.",
    name: "Forensics"
}
export const PoliceConnection: GameMove = {
    active: false,
    description: "From time to time you support the police (or another authority), who in return provide you with information. with information. Describe the person you are mainly in contact with. If you ask your contact person for information that this other institution has If you ask your contact for information that this other institution has, it will be considered as if you had successfully searched for something. Your contact may ask for a favour in return or for information as well",
    name: "Police connection"
}
