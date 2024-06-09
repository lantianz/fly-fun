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

const initTabList = () => {
    anime.value.dramasList ? getList(anime.value.dramasList[0]) : null
}

const router = useRouter()
const route = useRoute()
const from = ref(null)
watchEffect(() => {
    from.value = route.query.url
    document.title = '《' + anime.value.title + '》' + '-FlyFun'
    initTabList()
})

const goToPlay = (url) => {
    router.push({ name: 'Play', query: { url: url, from: from.value } })
}
const show = ref(false)
const showErr = () => {
    anime.value.dramasList[0] ? goToPlay(anime.value.dramasList[0].dramasItemList[0].url) : show.value = true
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
                        <div class="tag">
                            <el-check-tag v-for="(tag, i) in anime.tagTitles" :key="anime.tagUrls[i]"
                                style="margin: 8px;" size="small" checked round>{{ tag }}</el-check-tag>
                        </div>
                    </li>
                </ul>
                <h3 v-if="show">暂无资源</h3>
                <el-button type="primary" round @click="showErr">立即播放</el-button>
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
        background-color: #dddfdd;
        border-radius: 12px;
        padding: 30px;
        width: 100%;
        height: calc(20vw * 4 / 3);
        display: flex;
        gap: 20px;


        .anime-poster {
            width: 25%;
            height: 100%;
            border-radius: 10px;
        }

        .anime-info {
            width: 75%;
            height: 100%;
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

                    .tag {
                        overflow: auto;
                        max-height: calc(20vw * 3 / 7);
                    }
                }
            }

            .el-button {
                width: 50%;
                margin: 0 auto;
                margin-top: auto;
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