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
    description: "You have a small laboratory where you can compare fingerprints, look at evidence under the microscope and carry out simple chemical tests. microscope and carry out simple chemical tests. When you examine a piece of When you examine a piece of evidence in your lab, roll + IN. * A 10+ will give you useful information.  * If you roll a 7-9, you also get a useful piece of information, but you have to choose 2:  You have used up an expensive resource. You destroyed the evidence during the investigation.  While you were concentrating on the investigation, you missed something important.  something important. Possession of the evidence puts you or your allies in danger.",
    name: "Forensics"
}
export const PoliceConnection: GameMove = {
    active: false,
    description: "From time to time you support the police (or another authority), who in return provide you with information. with information. Describe the person you are mainly in contact with. If you ask your contact person for information that this other institution has If you ask your contact for information that this other institution has, it will be considered as if you had successfully searched for something. Your contact may ask for a favour in return or for information as well",
    name: "Police connection"
}

export const Informer: GameMove = {
    active: false,
    name: "Informer",
    description: "You maintain an information network. If you ask one of these people to help you find an search for an object or person, they will ask for an object or cash of cash with a value of 1. If you give her this, you will receive a hint from the SL, that will get you closer to your goal. Then tell the SL who this person is and how you know them. know them.",
}

export const DetectiveAgency: GameMove = {
    active: false,
    name: "Detective Agency",
    description: "You have a small office with a telephone connection. If you don't have a case right now and spend at least one day in the office, roll + EM. You can do this 1 * per per game session. * If you roll a 10+, you will be assigned an interesting case (for example, this case is about someone who is falsely accused of a crime). You will receive a payment with a value of 4 if you can solve the case. * If you get a 7-9, you will be given an uninteresting case (for example, one that is about someone looking for their missing pet or wants you to chase an unfaithful spouse. an unfaithful spouse). You receive a payment with a value of 3, if you are successful. Your expenses will also be partly paid. If you earn money through expenses directly If you have to wipe out a money box because of expenses directly related to the case, you can tick a money box with a value of 1.",
}
export const ProminentClientele: GameMove = {
    active: false,
    name: "Prominent clientele",
    description: "You once solved a particularly high-profile case, for example for a celebrity from celebrity from film, industry or politics. When you ask this client for help for help, you can choose 1 * 1 per game session: Get protection for a person in danger. Use your contact as leverage in persuading someone to get out of trouble. to get out of trouble. Be introduced to another important person.",
}

export const Clever: GameMove = {
    active: false,
    name: "Clever",
    description: "In your city, you know every street and every dark alley. When you follow someone through the streets or investigate the scene of a crime there, you will always receive additional information.",
}

export const AntiqueShop: GameMove = {
    active: false,
    name: "Antique Shop",
    description: " You own and run a small antique shop that you bought or inherited years ago. inherited years ago. Many of the objects on the shelves date from before you took over. from time to time you discover things you didn't even know you owned. you owned. When you search your shop, you can find a useful item on the shelves 1 * per game session. useful item on the shelves. The SL decides what kind of item it is, but of course you can you can of course tell her what you are looking for. Sleuthing for collections If in a conversation about an old man-made object you you can roll for INTELLIGENCE instead of EMPATHY. On a 7-9 you may ask 2 questions instead of 1.",
}

export const DangerousBooks: GameMove = {
    active: false,
    name: "Dangerous Books",
    description: "Your expertise lies in treating ancient occult works with care and studying them. study them. When you study a fearsome or dangerous book, you will always receive always get at least one piece of information, regardless of the dice result of a turn. Horrors of the past From your studies you know some terrible events in the history of mankind. humanity. If you suffer a mental disturbance because you are confronted with a horror that took place in the distant past horror that took place in the distant past, you can reduce the level of the disorder by 1. by 1. Explain why the situation frightens you less than others. Old stories If you hear something about an old object made by human hands, the SL will 1 * per game session, the SL will tell you a story that comes to your mind about it. Explain to the SL how you know the story. Old weapons You have an old weapon that has special powers. When you choose this move, describe the weapon, what it does and how you got it. Some suggestions for special powers are for example: You can always retrieve it after you have thrown it. It can hurt certain creatures that are actually immune to weapon violence. violence. You need it for an ancient summoning ritual. It gives off an eerie blue glow when wetted with blood.",
}

export const HorrorsOfThePast: GameMove = {
    active: false,
    name: "Horrors of the past",
    description: "From your studies you know some terrible events in the history of mankind. of mankind. If you suffer a mental disturbance because you are confronted with a horror that took place in the distant past horror that took place in the distant past, you can reduce the degree of the disturbance by 1. Explain why the situation frightens you less than others. Old stories If you hear something about an old object made by human hands, the SL will 1 * per game session, the SL will tell you a story that comes to your mind about it. Explain to the SL how you know the story.",
}
export const OldWeapon: GameMove = {
    active: false,
    name: "Old weapon",
    description: "You have an old weapon that has special powers. When you choose this move, describe the weapon, what it does and how you got it. Some suggestions for special powers are for example: You can always retrieve it after you have thrown it. It can hurt certain creatures that are actually immune to weapon violence. violence. You need it for an ancient summoning ritual. It gives off an eerie blue glow when wet with blood. ANTIQUAR:IN",
}

export const KnowledgeAboutOldThings: GameMove = {
    active: false,
    name: "Knowledge about old things",
    description: 'If you have knowledge of an old man-made object with a 7+, you may give the SL an additional you may ask the SL 2 of the following questions in addition to the usual effects of the turn. following questions: Where was it made? When was it made? What was it used for? How many of these objects are there? How much is it worth? You can only use this skill 1 * per object.',
}

export const TradeInAntiques: GameMove = {
    active: false,
    name: "Trade in antiques",
    description: 'If you are looking for an old man-made object, you can 1 * per game session, you can get information or be put on the right track by a NF you know. on the right track via a NF you know. Tell the SL how you got the information or how you got the NF. or how you know the NF. ',
}

export const FlairForCollections: GameMove = {
    active: false,
    name: "A flair for collections",
    description: 'If you recognise truth in a conversation about an old, man-made object you can roll for INTELLIGENCE instead of EMPATHY. On a 7-9 you may ask 2 questions instead of 1.',
}

export const OldStories: GameMove = {
    active: false,
    name: "Old stories",
    description: 'If you hear about an old man-made object, the SL will tell you a story about it once per game session. 1 × per session, the SL will tell you a story that comes to your mind about it. Explain to the SL how you know the story.',
}

