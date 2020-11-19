import { PlayerActor, PlayerSheet } from "./actors/player.js";
import { ItemType } from "./item/data.js";
import { WeaponSheet } from "./item/weapon.js";

console.log("foured | Loaded foured.js file");

// Configure standard formulas
CONFIG.Combat.initiative.formula = "1d20 + @initiative.modifier";

Hooks.once('init', async function () {
    console.log("foured | Starting foured initialization");

    CONFIG.Actor.entityClass = PlayerActor;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("foured", PlayerSheet, {makeDefault: true, types: ["character"], label: "FOURED.Player"})

    Items.registerSheet("foured", WeaponSheet, { types: [ItemType.Weapon], makeDefault: true });

    Handlebars.registerHelper('debug', function (...a) {
        console.log(a);
    });

    Handlebars.registerPartial('selectbox', '<select name="{{name}}">{{#each options}}<option value="{{this}}"{{#if (eq ../value this)}} selected{{/if}}>{{this}}</option>{{/each}}</select>')
});