import { AbilityScore, AbilityScores, CharacterLevel, Senses } from "./data.js";
import { Hp, Defenses } from "../common/data.js";
import { ItemType } from "../config.js";
import { data } from "jquery";
import { FouredActor, FouredData, PlayerActor, PlayerData } from "./index.js";
import DataObjectParser from "../util/dataobject-parser.js";

export class PlayerSheet extends ActorSheet<PlayerData, PlayerActor> {

    /** @override */
    getData() {
        const data = super.getData();
        console.log("Preparing actor sheet data...");
        this._prepareItems(data);
        return data;
    }

    activateListeners(html) {
        html.find('.item-delete').click(this._onItemDelete.bind(this));
        html.find('.d20roll').dblclick(this._roll20.bind(this));
        super.activateListeners(html);
    }

    _roll20(event) {

        const data = this.object.getRollData();
        data.flavor = event.target.getAttribute("data-roll-type") || "";
        const roll: any = new Roll("1d20 + @" + event.target.getAttribute("data-roll"), data);
        roll.toMessage(data);
    }

    _onItemDelete(event) {
        event.preventDefault();
        const li = event.currentTarget.closest(".item");
        this.actor.deleteOwnedItem(li.dataset.itemId);
    }


    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["foured", "sheet", "player-character"],
            template: "systems/foured/templates/actors/playerSheet.html",
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

    _prepareItems(data) {
        const inventory = {};
        console.log("Preparing item data...");

        data.items.map((item) => {
            if (inventory[item.type] === undefined) {
                inventory[item.type] = {};
                inventory[item.type].items = [];
            }
            const items = inventory[item.type].items;
            items.push(item);
        })

        data.inventory = inventory;
    }

    _updateObject(event: Event, formData: any): Promise<PlayerActor> {
        formData.dataType = "player";
        return this.object.update(formData) as any;
    }
}
