<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const days = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
const activeDay = ref('周二');

const animeData = ref({
    '周一': [
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ],
    '周二': [
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至04集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至05集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ],
    '周三': [
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ],
    '周四': [
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ],
    '周五': [
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
    ],
    '周六': [
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ],
    '周日': [
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/avatar.jpg', episodes: '更新至06集' },
        { title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ]
});

const getMoreSchedule = () => {
    ElMessage({
        message: '更多每日放送......',
        type: 'success',
    })
}
</script>

<template>
    <div class="home-schedule">
        <h1>本周番剧</h1>
        <div class="tabs">
            <el-button round v-for="day in days" :key="day" :class="{ active: activeDay === day }"
                @click="activeDay = day">
                {{ day }}
            </el-button>
            <el-button round @click="getMoreSchedule" class="more">更多</el-button>
        </div>
        <div class="anime-list">
            <div v-for="anime in animeData[activeDay]" :key="anime.title" class="anime-item">
                <RouterLink :to="'/Anime/' + `${anime.id}`">
                    <el-image :src="anime.image" lazy />
                    <div class="anime-info">
                        <h3>{{ anime.title }}</h3>
                        <p>{{ anime.episodes }}</p>
                    </div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-schedule {
    padding: 30px;

    h1 {
        color: $blackColor1;
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
            background: $xtxColor;
            color: $whiteColor1;
        }

        &.active {
            background: $xtxColor;
            color: $whiteColor1;
        }
    }

    .more {
        margin-left: auto;
        background: $xtxColor;
        color: $whiteColor1;

        &:hover {
            background: #333333;
            color: #dddddd;
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