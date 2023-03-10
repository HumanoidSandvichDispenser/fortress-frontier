import Area from "./area";
import AttackResult from "./attack-result";
import Player from "./player";
import { random } from "./utils";

export default class Unit {
    name: string;
    player: Player | null;
    area: Area | null;
    level: number;
    isDead: boolean = false;

    constructor(type: string, level: number) {
        this.name = type;
        this.level = level;
        this.player = null;
        this.area = null;
    }

    assignToPlayer(player: Player) {
        this.player = player;
        if (!this.player.units.has(this)) {
            this.player.addUnit(this);
        }
    }

    assignToArea(area: Area) {
        if (this.area != null) {
            // remove ourselves from our old area
            this.area.removeUnit(this);
        }
        this.area = area;
        area.addUnit(this);
    }

    moveToArea(area: Area): boolean {
        let weakest;
        while (true) {
            weakest = area.findLowestUnit();

            if (!weakest || weakest.player == this.player) {
                break;
            }

            if (this.isDead) {
                break;
            }

            const results = this.attack(weakest);
            if (results.winner != this) {
                this.die(results);
            }

            if (results.winner != weakest) {
                weakest.die(results);
            }
        }

        if (!this.isDead) {
            this.assignToArea(area);
        }

        return true;
    }

    die(result: AttackResult): void {
        this.isDead = true;
        this.area?.removeUnit(this);
        console.log(result.attacker.name + ": " + result.attackerRoll);
        console.log(result.victim.name + ": " + result.victimRoll);
        console.log(result.winner?.name + " won");
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
        let theirRoll = theirRolls.reduce((val, sum) => sum += val);
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
