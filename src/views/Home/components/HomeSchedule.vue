<script setup>
import AnimeItem from '@/components/AnimeItem.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { getWeekAPI } from '@/apis/home'

const week = ref([]);

const getWeek = async () => {
    try {
        const res = await getWeekAPI();
        week.value = res.data.weekDataBeans;
        return week.value;
    } catch (error) {
        console.error('Error fetching week data:', error);
    }
};

const days = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])
// 获取今天
const getToday = () => {
    const today = ref(0)
    today.value = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    return today.value
}
const activeDay = ref(getToday())

const animes = ref([])
const selectDay = (index) => {
    activeDay.value = index
    animes.value = week.value[activeDay.value].weekItems;

}

onMounted(() => {
    getWeek().then((res) => {
        for (let i = 0; i < res.length; i++) {
            if (res[i].weekDay === activeDay.value) {
                animes.value = res[i].weekItems;
            }
        }
    })
})

const router = useRouter()
const goToAnime = (url) => {
    router.push({ path: '/Anime' + url })
}


</script>

<template>
    <div id="home-schedule" class="home-schedule">
        <h1>本周更新</h1>
        <el-divider />

        <div class="tabs">
            <el-button round v-for="(day, index) in days" :key="day" :class="{ active: activeDay === index }"
                @click="selectDay(index)">
                {{ day }}
            </el-button>
        </div>
        <div class="anime-list">
            <AnimeItem v-for="anime in animes" :key="anime" :anime="anime" :clickEvent="goToAnime"></AnimeItem>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-schedule {
    padding: 30px;

    h1 {
        font-size: 40px;
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

.tabs {
    margin-top: 10px;
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