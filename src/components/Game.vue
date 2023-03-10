<script setup lang="ts">
import { ref } from "vue";
import Area from "../area";
import { useGameStore } from "../store/game";
import AreaVue from "./Area.vue";
import AreaInfoVue from "./AreaInfo.vue";
import PlayerInfoVue from "./PlayerInfo.vue";

const game = useGameStore();
game.createGame(2);

function onAreaClicked(area: Area) {
    if (game.movingUnit != undefined) {
        if (area.isAdjacentTo(game.movingUnit.area)) {
            game.movingUnit.moveToArea(area);
            game.movingUnit = undefined;
            game.currentTurn++;
        } else {
            // cancel
            game.movingUnit = undefined;
            return;
        }
    }

    if (area == selectedArea.value) {
        selectedArea.value = undefined;
    } else {
        selectedArea.value = area;
    }
}

const selectedArea = ref<Area>();
</script>

<template>
    <div class="game">
        <div>
            <div class="grid">
                <div class="row" v-for="row in game.areas">
                    <div class="cell" v-for="cell in row">
                        <area-vue :area="cell" @click="onAreaClicked(cell)" />
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar">
            <player-info-vue />
            <area-info-vue v-if="selectedArea" :area="selectedArea" />
        </div>
    </div>
</template>

<style scoped>
.game {
    display: flex;
}
.grid {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
}
.grid .row {
    display: flex;
    column-gap: 8px;
}
</style>
