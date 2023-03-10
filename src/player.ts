import Card from "./card";
import ResourceCollection from "./resource-collection";
import Unit from "./unit";

export default class Player {
    name: string;
    resources: ResourceCollection;
    units: Set<Unit>;
    cards: Card[];
    color: string = "--bg0";

    constructor(name: string) {
        this.name = name;
        this.resources = {
            food: 5,
            wood: 5,
            stone: 5,
            metal: 5,
        };
        this.units = new Set<Unit>();
        this.cards = [];
    }

    addUnit(unit: Unit) {
        this.units.add(unit);
        unit.assignToPlayer(this);
    }

    removeUnit(unit: Unit) {
        this.units.delete(unit);
    }
}
