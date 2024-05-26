<script setup>
import AnimeItem from '@/components/AnimeItem.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const { lineNum, lineCount, animeObj, clickEvent } = defineProps(['lineNum', 'lineCount', 'animeObj', 'clickEvent'])

const router = useRouter()
const getMore = (url) => {
    router.push({ path: '/More' + url })
    console.log("获取更多:", url)
}

const isNull = (val) => {
    if (val == null || val == undefined || val == "") {
        return true
    }
    return false
}

let lineNumD = 2
let lineCountD = 6
lineNumD = isNull(lineNum) ? 2 : lineNum
lineCountD = isNull(lineCount) ? 6 : lineCount

const pageIndex = ref(0)
const animes = ref([])
const group = () => {
    let index = 0;
    const newArray = [];
    while (index < animeObj.items.length) {
        newArray.push(animeObj.items.slice(index, index += (lineCountD * lineNumD)));
    }
    return newArray;
}

const before = () => {
    if (pageIndex.value < 1) {
        return
    }
    animes.value = group()[pageIndex.value - 1]
    pageIndex.value -= 1
}
const after = () => {
    if (pageIndex.value >= Math.ceil(animeObj.items.length / (lineCountD * lineNumD)) - 1) {
        return
    }
    animes.value = group()[pageIndex.value + 1]
    pageIndex.value += 1
}
onMounted(() => {
    animes.value = group()[pageIndex.value]
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
            <div class="pager" v-if="animeObj.items.length > (lineCountD * lineNumD)">
                <a @click="before">&lt;</a>
                <span>{{ pageIndex + 1 }}</span>
                <span>&nbsp;/&nbsp;</span>
                <span>{{ Math.ceil(animeObj.items.length / (lineCountD * lineNumD)) }}</span>
                <a @click="after">&gt;</a>
            </div>
        </div>
        <div class="anime-list">
            <AnimeItem v-for="anime in animes" :key="anime" :anime="anime" :click-event="clickEvent" />
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
        width: 250px;
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

    .pager {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #cccccc;

        a {
            color: #cccccc;
            font-size: 22px;
            margin: 0 10px;
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