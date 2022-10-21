export interface Character {
    player: Partial<Player>;
    profession: Profession | null;
    name: string;
    look: string;
    passions: Passion[];
    relationships: Relationship[];
    otherPlayers: Player[];
    attributes: Attributes;
    gear: Gear[];
    injuries: Injuries[];
    disorders: Injuries[];
    experiencePoints: number;
    assets: number;
    reputation: number;
    gameMoves: GameMove[];
    notes: string;
}

export enum ProfessionEnum {
    INVESTIGATOR = 'investigator',
    ANTIQUAR = 'antiquar'
}

export interface Player {
    characterName: string;
    profession?: ProfessionEnum;
    playedBy?: string;
}

export interface Passion {
    name: string;
    active: boolean;
}

export interface Profession {
    name: string;
    description: string;
    startAssets: number;
    professionMoves: {
        starter: GameMove[];
        available: GameMove[];
    }
    starterGear: Gear[],
    passions: Passion[];
    relationsShips: Relationship[];
    importantAttributes?: {
        intelligence?: boolean;
        empathy?: boolean;
        wisdom?: boolean;
        dexterity?: boolean;
        strength?: boolean;
    }
}

export interface GameMove {
    name: string;
    description: string;
    active: boolean;
}

export enum InjurieStrength {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
    CRITICAL = "critical"
}

export interface Injuries {
    name: string;
    strength: InjurieStrength;
}

export interface Gear {
    name: string
    count?: number
}

export interface Attributes {
    intelligence: number;
    empathy: number;
    willpower: number;
    dexterity: number;
    strength: number;
}

export interface Relationship {
    personName: string;
    description: string;
}