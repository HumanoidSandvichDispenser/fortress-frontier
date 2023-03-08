import Card from "./card";
import ResourceCollection from "./resource-collection";
import Unit from "./unit";

export default class Player {
    name: string;
    resources: ResourceCollection;
    units: Unit[];
    cards: Card[];

    constructor(name: string) {
        this.name = name;
        this.resources = {
            food: 5,
            wood: 5,
            stone: 5,
            metal: 5,
        };
        this.units = [];
        this.cards = [];
    }

    addUnit(unit: Unit) {
        this.units.push(unit);
        unit.assignToPlayer(this);
    }

    removeUnit(unit: Unit) {
        const index = this.units.indexOf(unit);
        if (index !== -1) {
            this.units.splice(index, 1);
        }
    }
}
