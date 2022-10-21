import { ProfessionEnum, type Profession } from "../model/character";
import { AntiqueShop, Clever, DangerousBooks, DetectiveAgency, EyeForDetails, FlairForCollections, Forensics, HorrorsOfThePast, Informer, KnowledgeAboutOldThings, OldStories, OldWeapon, PoliceConnection, ProminentClientele, Shadow, TradeInAntiques } from "./special-moves";

export const Professions = new Map<ProfessionEnum, Profession>([
    [ProfessionEnum.INVESTIGATOR, {
        name: ProfessionEnum.INVESTIGATOR,
        startAssets: 1,
        description: "Whether you work for the police, a government agency or a private detective agency detective agency, your job is to spot the clues that others that others don't see and to connect them. and connect them.You could be hired to, to find missing persons, keep tabs on suspicious characters... or solve a crime.",
        professionMoves: {
            starter: [{ ...EyeForDetails, active: true }, { ...Shadow, active: true }],
            available: [PoliceConnection, Forensics, Informer, DetectiveAgency, ProminentClientele, Clever]
        },
        passions: [
            {
                active: false,
                name: "I am fascinated by how criminals think",
            },
            {
                active: false,
                name: "The guilty must pay for their crimes.",
            },
            {
                active: false,
                name: "I love the challenge of a good mystery."

            },
        ],
        relationsShips: [
            {
                personName: '',
                description: 'is a mystery for me that I want to fathom.'
            },
            {
                personName: '',
                description: 'works sloppily and could learn a thing or two from my methods.'
            },
            {
                personName: '',
                description: 'I have to protect him because no one else will.'
            }
        ],
        starterGear: [
            {
                name: 'Torch',
                count: 1
            },
            {
                name: 'Magnifying glass',
                count: 1
            },
            {
                name: 'Various newspaper subscriptions (5 applications)',
                count: 1
            },
            {
                name: 'Choose 1: .38 calibre revolver, camera, unreliable automobile',
                count: 1
            },
        ],

        importantAttributes: {
            intelligence: true
        }
    }],

    [ProfessionEnum.ANTIQUAR, {
        name: ProfessionEnum.ANTIQUAR,
        startAssets: 2,
        description: "Rare things are your speciality. Nothing makes you happier than rummaging through a hidden antique shop or a household clearance. The objects you objects you collect and sell bring the past to life and fill your bank account. You have a interest in things that are strange and mysterious. are.",
        professionMoves: {
            starter: [{ ...KnowledgeAboutOldThings, active: true }, { ...TradeInAntiques, active: true }],
            available: [AntiqueShop, FlairForCollections, DangerousBooks, HorrorsOfThePast, OldStories, OldWeapon]
        },
        passions: [

            {
                active: false,
                name: "I fanatically collect a certain type of antique (weapons, clocks, etc.).",

            },
            {
                active: false,
                name: "Antiques should be used for the purpose for which they were built, not gathering dust on a shelf.",

            },
            {
                active: false,
                name: "I love the challenge of a good mystery."

            },
        ],
        relationsShips: [
            {
                personName: '',
                description: 'I need to help value the past.'
            },
            {
                personName: '',
                description: 'owns something I want to add to my collection.'
            },
            {
                personName: '',
                description: 'saved me and I am in his/her debt.'
            },
        ],
        starterGear: [
            {
                name: 'Magnifying glass',
                count: 1
            },
            {
                name: 'Reference books on antiques and history (5 applications)',
                count: 1
            },
            {
                name: 'Choose 1 antique: jewel, comb, pocket watch (value 5 each)',
                count: 1
            },
        ],
        importantAttributes: {
            intelligence: true
        }
    }]
]);
