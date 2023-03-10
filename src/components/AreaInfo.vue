<script setup lang="ts">
import Area from "../area";
import { useGameStore } from "../store/game";
import Unit from "../unit";
import { computed } from "vue";
import ResourceCollection from "../resource-collection";
import Player from "../player";

const game = useGameStore();

const props = defineProps({
    area: Area
});

interface UnitConfig {
    name: string,
    level: number,
    cost: ResourceCollection
}

const unitConfigs: { [key: string]: UnitConfig } = {
    "Scout": {
        name: "Scout",
        level: 2,
        cost: {
            food: 1,
            wood: 1,
            stone: 0,
            metal: 0,
        } as ResourceCollection,
    },
    "Soldier": {
        name: "Soldier",
        level: 2,
        cost: {
            food: 1,
            wood: 1,
            stone: 0,
            metal: 1,
        } as ResourceCollection,
    },
    "Heavy": {
        name: "Heavy",
        level: 3,
        cost: {
            food: 2,
            wood: 2,
            stone: 0,
            metal: 2,
        } as ResourceCollection,
    },
};

const areaHasCurrentPlayer = computed(() => {
    if (!props.area) {
        return false;
    }
    const units = props.area.units;
    const plr = game.currentPlayer;
    return Array.from(units).find((unit) => unit.player == plr) != undefined;
});

function toggleMoveUnit(unit: Unit) {
    if (game.movingUnit != undefined) {
        game.movingUnit = undefined;
    } else {
        game.movingUnit = unit;
    }
}

function requestUnit(player: Player, area: Area, name: string) {
    let config = unitConfigs[name];
    const r = player.resources;
    const c = config.cost;
    if (r.wood >= c.wood && r.food >= c.food &&
        r.stone >= c.stone && r.metal >= c.metal) {
        r.food -= c.food;
        r.wood -= c.wood;
        r.stone -= c.stone;
        r.metal -= c.metal;
        const unit = new Unit(name, config.level);
        player.addUnit(unit);
        area.addUnit(unit)
    }
}
</script>

<template>
    <div class="resource-info">
        <h1>Area at ({{ area.col + 1 }}, {{ area.row + 1 }})</h1>
        <div>Owned by {{ area?.owner?.name ?? "no one" }}</div>
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
        <div>
            {{ area?.units.size ?? 0 }} unit(s) in this area
            <ul>
                <li v-for="unit in area?.units">
                    {{ unit.name }}
                    <button
                        v-if="unit.player == game.currentPlayer"
                        @click="toggleMoveUnit(unit)"
                    >
                        <span v-if="game.movingUnit == unit">
                            Cancel
                        </span>
                        <span v-else>
                            Move
                        </span>
                    </button>
                </li>
            </ul>
        </div>
        <div v-if="area?.owner == game.currentPlayer">
            <button @click="game.requestFortress(game.currentPlayer, area)">
                Build Fortress (costs 3 stone)
            </button>
            <button
                @click="game.requestCollectResource(game.currentPlayer, area)"
            >
                Get resource
            </button>
        </div>
        <div v-if="area?.owner == game.currentPlayer && area?.hasFortress">
            <button
                v-for="name in Object.keys(unitConfigs)"
                @click="requestUnit(game.currentPlayer, area, name)"
            >
                Train {{ name }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.resource-info {
    padding: 8px;
}
</style>
