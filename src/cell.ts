import Player from "./player";

export default interface Cell {
    owner: Player;
    units: Unit[];
}
