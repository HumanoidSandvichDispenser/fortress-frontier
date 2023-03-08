<script setup lang="ts">
import Area from "../area";
import { useGameStore } from "../store/game";

const game = useGameStore();

const props = defineProps({
    area: Area
});
</script>

<template>
    <div class="resource-info">
        <h1>Area at ({{ area.col + 1 }}, {{ area.row + 1 }})</h1>
        <table cellpadding="8">
            <th>Resource</th>
            <th>Count</th>
            <tr>
                <td>Food</td>
                <td>{{ area?.resources.food }}</td>
            </tr>
            <tr>
                <td>Wood</td>
                <td>{{ area?.resources.wood }}</td>
            </tr>
            <tr>
                <td>Stone</td>
                <td>{{ area?.resources.stone }}</td>
            </tr>
            <tr>
                <td>Metal</td>
                <td>{{ area?.resources.metal }}</td>
            </tr>
        </table>
        <div v-if="props.area.owner == game.currentPlayer">
            <button @click="game.requestFortress(game.currentPlayer, area)">
                Build Fortress (costs 2 stone)
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
