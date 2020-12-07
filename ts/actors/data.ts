import { PlayerClassItem } from "../item/playerClass.js";
import { FouredActor, FouredData, MonsterActor, PlayerActor } from "./index.js";

export type AbilityScores = {
    strength: AbilityScore;
    constitution: AbilityScore;
    dexterity: AbilityScore;
    intelligence: AbilityScore;
    wisdom: AbilityScore;
    charisma: AbilityScore;
}

export type AbilityScore = {
    value: number
}

export type CharacterLevel = {
    classes: ClassLevel[]
}

export type ClassLevel = {
    class: PlayerClassItem,
    value: number;
}

export type Senses = {
    perception: {
        value: number;
    }
    insight: {
        value: number;
    }
}

export function ScopeUpdateData(actor: FouredActor<FouredData>) {
    let scope = null;
    switch (actor.data.type) {
        case "character":
            scope = new PlayerActor(actor.data, actor.options);
            break;
        case "monster":
            scope = new MonsterActor(actor.data, actor.options);
            break;
    }

    let self = Object.assign(scope, actor);
    self.UpdateDerivedData(self.data.data);
}