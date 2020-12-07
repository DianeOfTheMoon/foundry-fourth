import { AbilityScores } from "./data.js";
import { FouredActor, FouredData, MonsterActor, MonsterData } from "./index.js";



export class MonsterSheet extends ActorSheet<MonsterData, MonsterActor> {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["foured", "sheet", "player-character"],
            template: "systems/foured/templates/actors/monsterSheet.html",
            width: 800,
            height: 800,
            tabs: [
                {
                    navSelector: ".sheet-tabs",
                    contentSelector: ".sheet-body",
                    initial: "main",
                },
            ],
            dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
        });
    }

} 