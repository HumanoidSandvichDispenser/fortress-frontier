<script setup lang="ts">
import Area from '../area';
import { computed, ref } from "vue";

const color = computed(() => {
    if (props.area && props.area.units.size > 0) {
        const color = Array.from(props.area.units)[0].player?.color;
        return color ?? "255, 255, 255";
    }
    return "255, 255, 255";
});

const opacity = computed(() => {
    return Math.min((props.area?.units.size ?? 0) / 4, 1);
});

const props = defineProps({
    area: Area
});
</script>

<template>
    <div class="area">
        <div>{{ props.area?.totalResources }}</div>
        <div v-if="area?.owner != null">
            {{ area.owner.name }}
        </div>
        <div v-if="area?.hasFortress">
            Fortress
        </div>
        <div v-if="area?.units.size ?? 0 > 0">
            {{ area?.units.size }} unit(s)
        </div>
    </div>
</template>

<style scoped>
.area {
    width: 96px;
    height: 96px;
    /*background-color: var(--bg1);*/
    background-color: rgba(v-bind(color), v-bind(opacity));
}
</style>
