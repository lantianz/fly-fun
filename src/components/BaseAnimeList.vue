<script setup>
import BasePageHandle from '@/components/BasePageHandle.vue';
import BaseAnimeItem from '@/components/BaseAnimeItem.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import { useSiftStore } from '@/stores/sift';
const siftStore = useSiftStore();
const { lineNum, lineCount, animeObj, clickEvent } = defineProps([ 'lineNum', 'lineCount', 'animeObj', 'clickEvent'])


const sonRef = ref(null)
const animes = ref([])
// 初始化子组件传来的数据onMounted
const init = () => watchEffect(() => {
    animes.value = sonRef.value.data
})

const router = useRouter()
const getMore = (url) => {
    siftStore.siftOptions.id = url
    router.push({ path: '/More/', query: siftStore.siftOptions })
    siftStore.getSiftByID(url)
}

onMounted(() => {
    init()
})
</script>

<template>
    <div class="home-anime">
        <div class="tabs">
            <div class="title">
                <h1>{{ animeObj.title }}</h1>
                <a v-if="animeObj.hasMore" @click="getMore(animeObj.more)" class="more">更多</a>
            </div>
            <el-divider />
            <BasePageHandle ref="sonRef" :lineNum="lineNum" :lineCount="lineCount" :aObj="animeObj" />
        </div>
        <div class="anime-list">
            <BaseAnimeItem v-for="anime in animes" :key="anime" :anime="anime" :click-event="clickEvent" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-anime {
    padding: 30px;
}

.tabs {
    display: flex;
    align-items: center;

    .title {
        width: 360px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-left: 30px;
            display: inline-block;
            color: $blackColor1;
        }

        .more {
            margin-right: 10px;
            font-weight: bold;
            color: #cccccc;
            cursor: pointer;

            &:hover {
                color: $xtxColor;
            }
        }
    }

    .el-divider {
        border-color: $xtxColor;
        border-width: 3px;
    }
}

.anime-list {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    row-gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;

    .anime-item {
        width: 200px;
        text-align: center;

        .el-image {
            width: 200px;
            height: 300px;
            border-radius: 10px;
        }

        .anime-info {
            margin-top: 10px;
        }
    }
}
</style>