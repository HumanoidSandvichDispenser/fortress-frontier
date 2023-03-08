import { computed, ref } from "vue";
import { defineStore } from "pinia";
import Player from "../player";
import Area from "../area";
import ResourceCollection from "../resource-collection";

const resourceConfig = [1, 2, 3, 2, 1];

export const useGameStore = defineStore("game", () => {
    const players = ref<Player[]>([]);
    const currentTurn = ref(0);
    const currentPlayer = computed(() => players.value[currentTurn.value]);

    function createGame(playerCount: number) {
        players.value.splice(0, players.value.length);
        for (let i = 0; i < playerCount; i++) {
            const name = "Player " + (i + 1);
            players.value.push(new Player(name));
        }
        currentTurn.value = 0;

        createAreas();
    }

    function createAreas() {
        areas.value.splice(0, areas.value.length);

        for (let row = 0; row < 5; row++) {
            areas.value[row] = [];
            for (let col = 0; col < 5; col++) {
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

    function requestFortress(player: Player, area: Area) {
        if (area.hasFortress) {
            return;
        }

        if (area.owner != player) {
            //return;
        }

        if (player.resources.stone < 2) {
            //return;
        }

        area.hasFortress = true;
        player.resources.stone -= 2;
    }

    function requestMoveUnit(player: Player, to: Area) {

    }

    const areas = ref<Area[][]>([]);

    return {
        players,
        currentPlayer,
        createGame,
        createAreas,
        requestFortress,
        areas
    }
});
