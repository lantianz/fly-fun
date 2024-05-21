<script setup>
import { ref } from 'vue';
import { useAnimeStore } from '@/stores/anime';

const animeStore = useAnimeStore()

const activeTab = ref([])
const activeEpisode = ref([])
const tabList = ref([])
const getList = (val, tab) => {
    tabList.value = val
    activeTab.value = tab
}
const videoPlay = (episode) => {
    activeEpisode.value = episode
};

</script>
<template>
    <div class="anime-detail">
        <div class="episodes">
            <h2>播放列表</h2>
            <div class="tabs">
                <span style="align-content: center">播放源：</span>
                <el-button v-for="(val, tab) in animeStore.anime.playlist" :key="tab" class="tab"
                    :class="{ active: activeTab === tab }" @click="getList(val, tab)">
                    {{ tab }}
                </el-button>
            </div>
            <div class="episode-list">
                <el-button v-for="episode in tabList" :key="episode" class="episode"
                    :class="{ active: activeEpisode === episode }" @click="videoPlay(episode)">
                    {{ episode.title + episode.link }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.anime-detail {
    padding: 0 20px 20px;
    max-width: 800px;
    margin: 0 auto;

    .episodes {
        margin-top: 20px;

        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;

            .tab {
                padding: 10px;
                background-color: #8080807a;
                color: #fff;
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


        }

        .episode-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .episode {
            margin: 0;
            padding: 10px;
            background-color: #f5f5f5;
            border: 1px solid #ddd;
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

    }
}
</style>