<script setup lang="ts">
import Area from '../area';

const props = defineProps({
    area: Area
});
</script>

<template>
    <div class="area">
        <div>{{ props.area?.totalResources }}</div>
    </div>
</template>

<style scoped>
.area {
    width: 96px;
    height: 96px;
    background-color: var(--bg1);
}
</style>
