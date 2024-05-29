<script setup>
import BaseArtPlayer from '@/components/BaseArtPlayer.vue';
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayStore } from '@/stores/play';
import { useAnimeStore } from "@/stores/anime";
const playStore = usePlayStore()
const animeStore = useAnimeStore()

// 响应式数据
const { playUrl } = storeToRefs(playStore)
const { anime } = storeToRefs(animeStore)

const defaultConfigs = reactive({
    id: 'your-url-id',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'src/assets/images/poster.png',
    autoplay: true,
    volume: 1,
    autoPlayback: true, //回放功能配合id
    icons: {
        // loading: '<img src="/assets/img/ploading.gif">', // 加载中图标
        // state: '<img width="150" heigth="150" src="/assets/img/state.svg">', // 暂停图标
        // indicator: '<img width="16" heigth="16" src="/assets/img/indicator.svg">',   //进度条图标
    },
})

watchEffect(() => {
  defaultConfigs.url = playUrl.value
})

const tabList = ref([])
const activeTab = ref([])
const getList = (tab) => {
  tabList.value = tab.dramasItemList
  activeTab.value = tab.listTitle
}
const router = useRouter()
const goToPlay = (url) => router.go('/Play' + url) //location.href = '/Play' + url

onMounted(() => {
  scrollTo(0, 0)
});
</script>

<template>
  <div class="player">
    <!-- 播放器 -->
    <el-col :span="16" id="app-container" class="video-box">
      <!-- <BaseXGPlayer :configs="defaultConfigs" /> -->
      <BaseArtPlayer :configs="defaultConfigs" style="width: 100%; height: 100%;" />
    </el-col>
    <!-- 信息 -->
    <el-col :span="8" class="info-box">
      <el-scrollbar class="infoElement">
        <div class="anime-info">
          <h1>{{ anime.title }}</h1>
          <ul>
            <li>{{ anime.score }}</li>
            <li>{{ anime.updateTime }}</li>
          </ul>
        </div>
        <div class="episodes">
          <h2>播放列表</h2>
          <div class="tabs">
            <span style="align-content: center">播放源：</span>
            <el-button v-for="tab in anime.dramasList" :key="tab" class="tab"
              :class="{ active: activeTab === tab.listTitle }" @click="getList(tab)">
              {{ tab.listTitle }}
            </el-button>
          </div>
          <span>{{ defaultConfigs.url }}</span>
          <div class="episode-list">
            <el-button v-for="episode in tabList" :key="episode" class="episode" @click="goToPlay(episode.url)">
              {{ episode.title }}
            </el-button>
          </div>
        </div>
      </el-scrollbar>
    </el-col>
  </div>
</template>

<style scoped lang="scss">
.player {
  display: flex;
  padding: 10px 50px 0 50px;
  width: 100vw;
  height: calc(calc((2 / 3) * 100vw - 100px) * calc(9 / 16));

  .video-box {
    width: 100%;
    height: 100%;

    .videoElement {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background: #000;
    }
  }

  .info-box {
    display: inline-block;
    overflow: auto;
    width: 100%;
    height: 100%;
    margin-left: 15px;

    .infoElement {
      width: 100%;
      height: 100%;
      border-radius: 16px;


      .anime-info {
        width: 100%;
        display: flex;
        flex-direction: column;

        h1 {
          font-size: 24px;
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
          height: auto;
          border: 1px solid #ddd;
          display: flex;
          flex-wrap: wrap;

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
  }
}
</style>
