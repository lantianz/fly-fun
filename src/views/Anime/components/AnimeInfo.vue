<script setup>
import { ref } from 'vue';
import { useAnimeStore } from '@/stores/anime';

const animeStore = useAnimeStore()

const activeEpisode = ref([])
const videoPlay = (e) => {
    activeEpisode.value = e
};

</script>
<template>
    <div class="anime-detail">
        <div class="header">
            <el-image :src="animeStore.anime.cover" class="anime-poster" lazy />
            <div class="anime-info">
                <h1>{{ animeStore.anime.title }}</h1>
                <ul>
                    <li>评分: {{ animeStore.anime.rank }}</li>
                    <li>集数: {{ animeStore.anime.season }}</li>
                    <li>声优: {{ animeStore.anime.actors.join(', ') }}</li>
                    <li>导演: {{ animeStore.anime.master }}</li>
                    <li>地区: {{ animeStore.anime.region }}</li>
                    <li>语言: {{ animeStore.anime.lang }}</li>
                    <li>年份: {{ animeStore.anime.first_date }}</li>
                    <li>标签: {{ animeStore.anime.categories.join('/ ') }}</li>
                </ul>
                <el-button class="btn-play" round @click="videoPlay">立即播放</el-button>
            </div>
        </div>
        <div class="description">
            <h2>剧情简介</h2>
            <p>暂时没有~</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.anime-detail {
    padding: 20px 20px 0;
    max-width: 800px;
    margin: 0 auto;


    .header {
        display: flex;
        gap: 20px;


        .anime-poster {
            width: 200px;
            height: auto;
            border-radius: 10px;
        }

        .anime-info {
            display: flex;
            flex-direction: column;
            font-weight: bold;

            .btn-play {
                background: $xtxColor;
                color: $whiteColor1;

                &:hover {
                    color: #000000;
                }
            }
        }

        .anime-info h1 {
            margin: 0 0 10px;
        }

        .anime-info ul {
            list-style: none;
            padding: 0;
            margin: 0 0 20px;
        }

        .anime-info ul li {
            margin-bottom: 5px;
        }
    }

    .description {
        margin-top: 20px;

        h2 {
            margin: 0 0 10px;
        }
    }

}
</style>