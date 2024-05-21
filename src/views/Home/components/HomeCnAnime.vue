<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const animeData = ref(
    [
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至04集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至05集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至04集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至05集' },
        { id: 2469, title: '凡人修仙传', image: 'src/assets/testImg/fanren.jpg', episodes: '更新至06集' }
    ]
);

const getMoreSchedule = () => {
    ElMessage({
        message: '更多精彩国漫......',
        type: 'success',
    })
}
</script>

<template>
    <div class="home-cn">
        <div class="tabs">
            <h1>精彩国漫</h1>
            <el-button size="small" round @click="getMoreSchedule" class="more">更多</el-button>
        </div>
        <div class="anime-list">
            <div v-for="anime in animeData" :key="anime.title" class="anime-item">
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
.home-cn {
    padding: 30px;
}

.tabs {
    display: flex;
    align-items: center;

    h2 {
        display: inline-block;
        color: $blackColor1;
    }

    .more {
        font-weight: bold;
        border: none;
        margin-left: 20px;
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
            margin-top: 5px;
        }
    }
}
</style>