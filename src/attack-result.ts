import Unit from "./unit";

export default interface AttackResult {
    attacker: Unit;
    victim: Unit;
    winner?: Unit;
    attackerRolls: number[];
    attackerRoll: number;
    victimRolls: number[];
    victimRoll: number;
}
