<script setup>
import BasePageHandle from '@/components/BasePageHandle.vue';
import BaseAnimeItem from '@/components/BaseAnimeItem.vue';
import { ref, onMounted, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore()
const { week } = storeToRefs(homeStore)

const days = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])
const getToday = () => {
    const today = ref(0)
    today.value = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    return today.value
}
const activeDay = ref(getToday())

const aObj = reactive({
    items: []
})
const initAObj = () => {
    for (let i = 0; i < week.value.length; i++) {
        if (week.value[i].weekDay === activeDay.value) {
            aObj.items = week.value[i].weekItems;
        }
    }
}
// 初始化获得今日的数据 --> 子组件BasePageHandle
watchEffect(() => {
    initAObj()
})

const sonRef = ref(null)
const animes = ref([])
const initAnimes = () => watchEffect(() => animes.value = sonRef.value.data)

const selectDay = (index) => {
    activeDay.value = index
    aObj.items = week.value[activeDay.value].weekItems;
}

onMounted(() => {
    // 等待该页面挂载后获得子组件BasePageHandle的数据 --> animes --> 子组件BaseAnimeItem
    initAnimes()
})

const router = useRouter()
const goToAnime = (url) => router.push({ path: '/Anime', query: { url: url }})
</script>

<template>
    <div id="home-schedule" class="home-schedule">
        <div class="title">
            <h1>本周更新</h1>
            <el-divider />
            <BasePageHandle ref="sonRef" :lineNum="1" :aObj="aObj" />
        </div>
        <div class="tabs">
            <el-button round v-for="(day, index) in days" :key="day" :class="{ active: activeDay === index }"
                @click="selectDay(index)">
                {{ day }}
            </el-button>
        </div>
        <div class="anime-list">
            <BaseAnimeItem v-for="anime in animes" :key="anime" :anime="anime" :clickEvent="goToAnime"></BaseAnimeItem>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-schedule {
    padding: 30px;

    .title {
        display: flex;
        align-items: center;

        h1 {
            width: 240px;
            font-size: 36px;
            margin-left: 30px;
            display: inline-block;
            color: $blackColor1;
        }

        .el-divider {
            margin: 0;
            border-color: $xtxColor;
            border-width: 3px;

        }
    }
}

.tabs {
    margin: 10px 0 0 30px;
    display: flex;
    gap: 10px;

    .el-button {
        font-weight: bold;
        color: $blackColor1;
        border: none;
        cursor: pointer;

        &:hover {
            transition: all linear 0.3s;
            background: $xtxColor;
            color: $whiteColor1;
        }

        &.active {
            background: $xtxColor;
            color: $whiteColor1;
        }
    }
}

.anime-list {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    row-gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
}
</style>