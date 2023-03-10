import { computed, ref } from "vue";
import { defineStore } from "pinia";
import Player from "../player";
import Area from "../area";
import ResourceCollection from "../resource-collection";
import Unit from "../unit";
import { random, randomWeighted } from "../utils";

const resourceConfig = [1, 2, 3, 3, 2, 1];
const playerColors = ["224, 108, 117", "97, 175, 239", "152, 195, 121"];

export const useGameStore = defineStore("game", () => {
    const players = ref<Player[]>([]);
    const currentTurn = ref(0);
    const currentPlayer = computed(() => {
        return players.value[currentTurn.value % players.value.length];
    });

    function createGame(playerCount: number) {
        createAreas();

        players.value.splice(0, players.value.length);
        for (let i = 0; i < playerCount; i++) {
            const name = "Player " + (i + 1);
            const player = new Player(name);
            player.color = playerColors[i];
            players.value.push(player);

            // find a random starting place
            const area = pickSpawn(player);

            // give players starting units
            for (let i = 0; i < 2; i++) {
                let scout = new Unit("Scout", 1);
                let soldier = new Unit("Soldier", 2);
                player.addUnit(scout);
                player.addUnit(soldier);
                area.addUnit(scout);
                area.addUnit(soldier);
            }
        }
        currentTurn.value = 0;
    }

    function createAreas() {
        areas.value.splice(0, areas.value.length);

        for (let row = 0; row < 6; row++) {
            areas.value[row] = [];
            for (let col = 0; col < 6; col++) {
                const resources: ResourceCollection = {
                    food: 0,
                    wood: 0,
                    stone: 0,
                    metal: 0,
                }
                let majorResource = resourceConfig[col];
                let minorResource = resourceConfig[row];
                if (col % 2 == 0) {
                    resources.food += majorResource;
                } else if (col % 2 == 1) {
                    resources.wood += majorResource;
                }

                if (row % 2 == 0) {
                    resources.stone += minorResource;
                } else if (row % 2 == 1) {
                    resources.metal += minorResource;
                }
                areas.value[row].push(new Area(row, col, resources));
            }
        }
    }

    function pickSpawn(player: Player) {
        console.log(areas.value);
        let row: number;
        let col: number;
        do {
            row = random(0, 5);
            col = random(0, 5);
        } while (areas.value[row][col].owner != null)
        const area = areas.value[row][col];
        area.buildFortress();
        return area;
    }

    function requestFortress(player: Player, area: Area) {
        if (area.hasFortress) {
            return;
        }

        if (area.owner != player) {
            return;
        }

        if (player.resources.stone < 3) {
            return;
        }

        area.buildFortress();
        player.resources.stone -= 3;
        currentTurn.value++;
    }

    const movingUnit = ref<Unit | undefined>(undefined);

    function requestMoveUnit(player: Player, unit: Unit, to: Area) {
        if (unit.player == player) {
            unit.moveToArea(to);
            movingUnit.value = undefined;
            currentTurn.value++;
        }
    }

    function requestCollectResource(player: Player, area: Area): boolean {
        if (Array.from(area.units).find(unit => unit.player == player)) {
            let resource = randomWeighted(area.resources);
            area.resources[resource]--;
            player.resources[resource]++;
            currentTurn.value++;
            return true;
        } else {
            console.log("Player does not have units at this area");
            return false;
        }
    }

    const areas = ref<Area[][]>([]);

    return {
        players,
        currentTurn,
        currentPlayer,
        movingUnit,
        createGame,
        createAreas,
        requestFortress,
        requestMoveUnit,
        requestCollectResource,
        areas
    }
});
