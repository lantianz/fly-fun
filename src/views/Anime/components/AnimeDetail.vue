<script setup>
import { ref } from "vue";
import { useAnimeStore } from "@/stores/anime";
const animeStore = useAnimeStore()

const activeTab = ref([])
const tabList = ref([])
const getList = (tab) => {
    tabList.value = tab.dramasItemList
    activeTab.value = tab.listTitle
}

const videoPlay = (episode) => {
    if (episode === undefined || episode === null || episode === '') return
    console.log(episode)
}
</script>
<template>
    <div class="anime-detail">
        <div class="header">
            <el-image :src="animeStore.anime.img" class="anime-poster" fit="fill" lazy />
            <div class="anime-info">
                <h1>{{ animeStore.anime.title }}</h1>
                <ul>
                    <li>{{ animeStore.anime.score }}</li>
                    <li>{{ animeStore.anime.updateTime }}</li>
                    <li>标签: <el-link :underline="false" v-for="(tag, i) in animeStore.anime.tagTitles" :key="tag"
                            :href="animeStore.anime.tagUrls[i]"><el-check-tag style="margin: 8px;" size="small" checked round>{{
                                tag }}</el-check-tag></el-link></li>
                </ul>
                <el-button type="primary" round
                    @click="videoPlay(animeStore.anime.dramasList[0].dramasItemList[0].url)">立即播放</el-button>
            </div>
        </div>
        <div class="description">
            <h2>剧情简介</h2>
            <p>{{ animeStore.anime.introduction }}</p>
        </div>
        <div class="episodes">
            <h2>播放列表</h2>
            <div class="tabs">
                <span style="align-content: center">播放源：</span>
                <el-button v-for="tab in animeStore.anime.dramasList" :key="tab" class="tab"
                    :class="{ active: activeTab === tab.listTitle }" @click="getList(tab)">
                    {{ tab.listTitle }}
                </el-button>
            </div>
            <div class="episode-list">
                <el-button v-for="episode in tabList" :key="episode" class="episode" @click="videoPlay(episode.url)">
                    {{ episode.title }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.anime-detail {
    padding: 20px 20px 0;
    width: calc(100vw * 0.8);
    margin: 0 auto;


    .header {
        display: flex;
        gap: 20px;


        .anime-poster {
            width: 25%;
            height: auto;
            border-radius: 10px;
        }

        .anime-info {
            width: 75%;
            display: flex;
            flex-direction: column;

            h1 {
                font-size: 35px;
                font-weight: bold;
                margin: 0 0 10px;
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0 0 20px;

                li {
                    margin-bottom: 5px;
                }
            }
        }

    }

    .description {
        margin-top: 20px;

        h2 {
            margin: 0 0 10px;
        }
    }

    .episodes {
        margin-top: 20px;

        h2 {
            margin: 0 0 10px;
        }

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
            border: 1px solid #ddd;
            max-height: 200px;
            overflow: auto;
            display: flex;
            flex-wrap: wrap;

            // row-gap: 10px;
            // column-gap: 25px;
            &::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }

            &::-webkit-scrollbar-track {
                border-radius: 10px;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background-color: #8080807a;
            }

            .episode {
                margin: 10px;
                padding: 10px;
                background-color: #f5f5f5;
                border: 1px solid #ddd;
                cursor: pointer;

                &:hover {
                    background: $xtxColor;
                    color: $whiteColor1;
                }
            }
        }

    }
}
</style>