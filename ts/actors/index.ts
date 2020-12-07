import { Defenses, Hp } from "../common/data.js";
import { AbilityScores, CharacterLevel, ScopeUpdateData, Senses } from "./data.js";

export type FouredData = {
    initiativeBonus: number;
}

export class FouredActor<DataType extends FouredData> extends Actor<DataType> {
    prepareDerivedData() {
        ScopeUpdateData(this);
    }

    public UpdateDerivedData(data: any) {
        data.initiativeBonus = 0;
    }
}

export class MonsterActor extends FouredActor<MonsterData> {
    prepareDerivedData() {

    }
    public UpdateDerivedData(data: any) {
        super.UpdateDerivedData(data);
        data.initiativeBonus = this.data.data.initiative.value;
    }
}

export type MonsterData = FouredData & AbilityScores & {
    initiative: {
        value: number;
    }
}

export class PlayerActor extends FouredActor<PlayerData> {

    prepareDerivedData() {
    }

    /* @override */
    public UpdateDerivedData(data: any) {
        super.UpdateDerivedData(data);

        const dexBonus = Math.floor((data.dexterity.value - 10) / 2);
        const levelBonus = Math.floor(1 / 2);
        data.initiativeBonus = dexBonus + levelBonus;
        data.hp.bloodied = Math.floor(data.hp.max / 2);
        data.movement = {
            value: 6
        }
    }

}

export type PlayerData = FouredData & AbilityScores & Defenses & {
    name: string;
    hp: Hp;
    level: CharacterLevel;
    senses: Senses;
}
