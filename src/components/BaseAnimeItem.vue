<script setup>
const { anime, clickEvent } = defineProps(['anime', 'clickEvent'])

</script>

<template>
    <div class="anime-item" @click="clickEvent(anime.url)">
        <el-image v-if="anime.img" :src="anime.img" :lazy="true">
            <template #placeholder>
                <div class="load">
                    <div class="loader"></div>
                </div>
            </template>
            <template #error>
                <div class="load">
                    <div class="loader"></div>
                </div>
            </template>
        </el-image>
        <div class="anime-info">
            <h3>{{ anime.title }}</h3>
            <p>{{ anime.episodes }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/styles/loader.scss';

.anime-item {
    width: 200px;
    text-align: center;
    transition: all 0.4s;
    cursor: pointer;

    .el-image {
        width: 200px;
        height: 300px;
        border-radius: 20px;
    }

    .anime-info {
        margin-top: 10px;
    }

    &:hover {
        color: $xtxColor;
        transform: scale(1.1);
    }

    &:hover .el-image {
        filter: brightness(0.6);
    }
}
</style>
