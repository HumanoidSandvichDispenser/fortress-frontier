<script setup lang="ts">
import Player from "../player";
import { useGameStore } from "../store/game";
import { computed } from "vue";

const game = useGameStore();

const players = computed(() => game.players);
const currentPlayer = computed(() => game.currentPlayer);
</script>

<template>
    <div class="player-info">
        <div>Current player: {{ }}</div>
        <table>
            <th>Resource</th>
            <th v-for="player in players">{{ player.name }}</th>
            <tr>
                <td class="name">Food</td>
                <td
                    v-for="player in players"
                    :class="{
                        current: player == currentPlayer
                    }"
                >
                    {{ player.resources.food }}
                </td>
            </tr>
            <tr>
                <td class="name">Wood</td>
                <td
                    v-for="player in players"
                    :class="{
                        current: player == currentPlayer
                    }"
                >
                    {{ player.resources.wood }}
                </td>
            </tr>
            <tr>
                <td class="name">Stone</td>
                <td
                    v-for="player in players"
                    :class="{
                        current: player == currentPlayer
                    }"
                >
                    {{ player.resources.stone }}
                </td>
            </tr>
            <tr>
                <td class="name">Metal</td>
                <td
                    v-for="player in players"
                    :class="{
                        current: player == currentPlayer
                    }"
                >
                    {{ player.resources.metal }}
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
td {
    color: var(--fg2);
}

td.current, td.name {
    color: initial;
}
</style>
