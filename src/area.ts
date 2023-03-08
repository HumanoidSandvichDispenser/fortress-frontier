import Player from "./player";
import ResourceCollection from "./resource-collection";
import Unit from "./unit";

export default class Area {
    row: number;
    col: number;
    resources: ResourceCollection;
    owner: Player | null;
    units: Unit[];
    hasFortress: boolean;

    constructor(row: number, col: number, resources: ResourceCollection) {
        this.row = row;
        this.col = col;
        this.resources = resources;
        this.owner = null;
        this.units = [];
        this.hasFortress = false;
    }

    addUnit(unit: Unit) {
        this.units.push(unit);
    }

    removeUnit(unit: Unit) {
        const index = this.units.indexOf(unit);
        if (index != -1) {
            this.units.splice(index, 1);
        }
    }

    findLowestUnit() {
        return this.units.reduce((prev, cur) => {
            return prev.level < cur.level ? prev : cur;
        });
    }

    buildFortress() {
        this.hasFortress = true;
    }

    destroyFortress() {
        this.hasFortress = false;
    }

    collectResource(player: Player, name: string): boolean {
        if (name in this.resources) {
            if (this.resources[name] > 0) {
                player.resources[name]++;
                this.resources[name]--;
                return true;
            }
        }
        return false;
    }

    isAdjacentTo(area: Area) {
        if (Math.abs(this.row - area.row) == 1 && this.col - area.col == 0) {
            return true;
        }
        if (Math.abs(this.col - area.col) == 1 && this.row - area.row == 0) {
            return true;
        }
        return false;
    }

    get totalResources(): number {
        return Object.values(this.resources).reduce((prev, sum) => prev + sum);
    }
}
