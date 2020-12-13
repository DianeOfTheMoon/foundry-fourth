import { Defenses, Hp } from "../common/data.js";
import DataObjectParser from "../util/dataobject-parser.js";
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
        data.level = {
            value: 2,
            bonus: 1
        }
        const parser = new DataObjectParser(data);
        this.setAttributeBonuses(data);
        this.setSkillBonuses(data, parser);

        data.initiativeBonus = data.dexterity.bonus + data.level.bonus + data.initiative.value;
        data.hp.bloodied = Math.floor(data.hp.max / 2);
        data.movement = {
            value: 6
        }
        data.senses.perception.value = 10 + data.perception.bonus;
        data.senses.insight.value = 10 + data.insight.bonus;


    }

    private setAttributeBonuses(data) {
        data.strength.bonus = Math.floor((data.strength.value - 10) / 2);
        data.constitution.bonus = Math.floor((data.constitution.value - 10) / 2);
        data.dexterity.bonus = Math.floor((data.dexterity.value - 10) / 2);
        data.intelligence.bonus = Math.floor((data.intelligence.value - 10) / 2);
        data.wisdom.bonus = Math.floor((data.wisdom.value - 10) / 2);
        data.charisma.bonus = Math.floor((data.charisma.value - 10) / 2);
    }

    private setSkillBonuses(data, parser) {
        data.acrobatics.bonus = data.acrobatics.value + data.level.bonus + (data.acrobatics.trained ? 5 : 0) + parser.get(data.acrobatics.stat + '.bonus');
        data.arcana.bonus = data.arcana.value + data.level.bonus + (data.arcana.trained ? 5 : 0) + parser.get(data.arcana.stat + '.bonus');
        data.athletics.bonus = data.athletics.value + data.level.bonus + (data.athletics.trained ? 5 : 0) + parser.get(data.athletics.stat + '.bonus');
        data.bluff.bonus = data.bluff.value + data.level.bonus + (data.bluff.trained ? 5 : 0) + parser.get(data.bluff.stat + '.bonus');
        data.diplomacy.bonus = data.diplomacy.value + data.level.bonus + (data.diplomacy.trained ? 5 : 0) + parser.get(data.diplomacy.stat + '.bonus');
        data.dungeoneering.bonus = data.dungeoneering.value + data.level.bonus + (data.dungeoneering.trained ? 5 : 0) + parser.get(data.dungeoneering.stat + '.bonus');
        data.endurance.bonus = data.endurance.value + data.level.bonus + (data.endurance.trained ? 5 : 0) + parser.get(data.endurance.stat + '.bonus');
        data.heal.bonus = data.heal.value + data.level.bonus + (data.heal.trained ? 5 : 0) + parser.get(data.heal.stat + '.bonus');
        data.history.bonus = data.history.value + data.level.bonus + (data.history.trained ? 5 : 0) + parser.get(data.history.stat + '.bonus');
        data.insight.bonus = data.insight.value + data.level.bonus + (data.insight.trained ? 5 : 0) + parser.get(data.insight.stat + '.bonus');
        data.intimidate.bonus = data.intimidate.value + data.level.bonus + (data.intimidate.trained ? 5 : 0) + parser.get(data.intimidate.stat + '.bonus');
        data.nature.bonus = data.nature.value + data.level.bonus + (data.nature.trained ? 5 : 0) + parser.get(data.nature.stat + '.bonus');
        data.perception.bonus = data.perception.value + data.level.bonus + (data.perception.trained ? 5 : 0) + parser.get(data.perception.stat + '.bonus');
        data.religion.bonus = data.religion.value + data.level.bonus + (data.religion.trained ? 5 : 0) + parser.get(data.religion.stat + '.bonus');
        data.stealth.bonus = data.stealth.value + data.level.bonus + (data.stealth.trained ? 5 : 0) + parser.get(data.stealth.stat + '.bonus');
        data.streetwise.bonus = data.streetwise.value + data.level.bonus + (data.streetwise.trained ? 5 : 0) + parser.get(data.streetwise.stat + '.bonus');
        data.thievery.bonus = data.thievery.value + data.level.bonus + (data.thievery.trained ? 5 : 0) + parser.get(data.thievery.stat + '.bonus');
    }

}

export type PlayerData = FouredData & AbilityScores & Defenses & {
    name: string;
    hp: Hp;
    level: CharacterLevel;
    senses: Senses;
}
