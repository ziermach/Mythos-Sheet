export interface Character {
    player: Partial<Player>;
    profession: Profession;
    name: string;
    look: string;
    passion: string;
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
    INVESTIGATOR = 'investigator'
}

export interface Player {
    characterName: string;
    profession?: ProfessionEnum;
    playedBy?: string;
}

export interface Profession {
    name: string;
    description: string;
    professionMoves: {
        starter: GameMove[];
        available: GameMove[];
    }
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