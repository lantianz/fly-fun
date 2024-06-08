<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useAnimeStore } from "@/stores/anime";
import { storeToRefs } from "pinia";

const animeStore = useAnimeStore()
const { anime } = storeToRefs(animeStore)

const tabList = ref([])
const activeTab = ref([])
const getList = (tab) => {
    tabList.value = tab.dramasItemList
    activeTab.value = tab.listTitle
}

const router = useRouter()
const route = useRoute()
const from = ref(null)
watchEffect(() => {
    from.value = route.query.url
})
const goToPlay = (url) => {
    router.push({ name: 'Play', query: { url: url, from: from.value } })
}
</script>
<template>
    <div class="anime-detail">
        <div class="header">
            <el-image :src="anime.img" class="anime-poster" fit="fill" lazy />
            <div class="anime-info">
                <h1>{{ anime.title }}</h1>
                <ul>
                    <li>{{ anime.score }}</li>
                    <li>{{ anime.updateTime }}</li>
                    <li>标签:
                        <el-check-tag v-for="(tag, i) in anime.tagTitles" :key="anime.tagUrls[i]" style="margin: 8px;"
                            size="small" checked round>{{ tag }}</el-check-tag>
                    </li>
                </ul>
                <el-button type="primary" round
                    @click="goToPlay(anime.dramasList[0].dramasItemList[0].url)">立即播放</el-button>
            </div>
        </div>
        <!-- 剧情简介 -->
        <div class="description">
            <h2>剧情简介</h2>
            <p>{{ anime.introduction }}</p>
        </div>
        <!-- 播放列表 -->
        <div class="episodes">
            <h2>播放列表</h2>
            <div class="tabs">
                <span style="align-content: center">播放源：</span>
                <el-button v-for="tab in anime.dramasList" :key="tab" class="tab"
                    :class="{ active: activeTab === tab.listTitle }" @click="getList(tab)">
                    {{ tab.listTitle }}
                </el-button>
            </div>
            <div class="episode-list">
                <el-button v-for="episode in tabList" :key="episode" class="episode" @click="goToPlay(episode.url)">
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