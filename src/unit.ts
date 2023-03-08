import Area from "./area";
import AttackResult from "./attack-result";
import Player from "./player";
import { random } from "./utils";

export default class Unit {
    name: string;
    player: Player | null;
    area: Area | null;
    level: number;

    constructor(type: string, level: number) {
        this.name = type;
        this.level = level;
        this.player = null;
        this.area = null;
    }

    assignToPlayer(player: Player) {
        this.player = player;
        if (!this.player.units.includes(this)) {
            this.player.addUnit(this);
        }
    }

    assignToArea(area: Area) {
        this.area = area;
    }

    moveToArea(area: Area): boolean {
        if (this.area) {
            if (!this.area.isAdjacentTo(area)) {
                return false;
            }
            this.area.removeUnit(this);
        }

        if (area.owner == this.player) {
            // we own this area, so we can safely travel here
            this.area = area;
            area.addUnit(this);
        } else {
            let weakest = area.findLowestUnit();
            const results = this.attack(weakest);
            if (results.winner != this) {
                this.die();
            }

            if (results.winner != weakest) {
                weakest.die();
            }
        }

        return true;
    }

    die(): void {
        this.area = null;
    }

    /**
     * Attacks a unit.
     * @returns -1 if we lose, 0 if both loses, 1 if we win
     */
    attack(unit: Unit): AttackResult {
        let ourRolls: number[] = [];
        let theirRolls: number[] = [];

        for (let i = 0; i < this.level; i++) {
            ourRolls.push(random(1, 6));
        }

        for (let i = 0; i < unit.level; i++) {
            theirRolls.push(random(1, 6));
        }

        let ourRoll = ourRolls.reduce((val, sum) => sum += val);
        let theirRoll = ourRolls.reduce((val, sum) => sum += val);
        let winner: Unit | undefined;

        if (ourRoll > theirRoll) {
            winner = this;
        } else if (ourRoll < theirRoll) {
            winner = unit;
        }

        return {
            attacker: this,
            victim: unit,
            winner,
            attackerRolls: ourRolls,
            attackerRoll: ourRoll,
            victimRolls: theirRolls,
            victimRoll: theirRoll,
        };
    }
}
