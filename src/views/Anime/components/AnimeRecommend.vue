<script setup>
import BaseAnimeItem from '@/components/BaseAnimeItem.vue';
import { useAnimeStore } from "@/stores/anime";
import { useRouter } from 'vue-router'

const animeStore = useAnimeStore()

const router = useRouter()
const goToAnime = (url) => router.push({ path: '/Anime', query: { url: url }})
</script>

<template>
    <div class="anime-recommend">
        <div class="recommend-list">
            <h2>推荐</h2>
            <div class="anime-list">
                <BaseAnimeItem v-for="anime in animeStore.recommendList" :key="anime.title" :anime="anime"
                    :click-event="goToAnime" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/styles/loader.scss';

.anime-recommend {
    width: calc(100vw * 0.8);
    margin: 0 auto;

    .recommend-list {
        margin-top: 20px;

        h2 {
            padding: 20px 20px 0;
            margin: 0 0 10px;
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
                // filter: blur(1px);
                cursor: pointer;

                .el-image {
                    width: 200px;
                    height: 300px;
                    border-radius: 10px;

                    &:hover {
                        filter: brightness(0.5);
                    }
                }

                .anime-info {
                    margin-top: 10px;

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }
}
</style>