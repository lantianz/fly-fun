<script setup>
import BaseArtPlayer from '@/components/BaseArtPlayer.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref, toRefs, watch, watchEffect } from 'vue';
import { usePlayStore } from '@/stores/play';
const playStore = usePlayStore();
// 响应式数据
const props = defineProps(['url', 'dramasList'])
const { url, dramasList } = toRefs(props)

const route = useRoute();
const defaultConfigs = reactive({
  container: 'artplayer',
  id: route.query.url,
  url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  poster: 'src/assets/images/poster.png',
  autoplay: false,
  volume: 1,
  autoPlayback: true, //回放功能配合id
  icons: {},
})
const playerRef = ref(null)
const initPlayer = () => playerRef.value.init()
const destroyPlayer = () => playerRef.value.destroy()

watchEffect(() => {
  defaultConfigs.url = url.value
    document.title = '《' + dramasList.value[0].listInfo.title + '》'+dramasList.value[0].listInfo.episode + '-FlyFun'
})

watch(() => url.value, () => {
  if (playerRef.value) {
    destroyPlayer()
    getActiveTab()
    initPlayer()
  }
})
onMounted(() => {
  getActiveTab()
  initPlayer()
})

const getActiveTab = () => {
  for (let key in dramasList.value) {
    if (dramasList.value[key].selected) {
      getList(dramasList.value[key])
      activeTab.value = dramasList.value[key].listTitle
    }
  }
}
const tabList = ref([])
const activeTab = ref([])
const getList = (tab) => {
  tabList.value = tab.dramasItemList
  activeTab.value = tab.listTitle
}

const reverse = () => {
  tabList.value.reverse()
}

const router = useRouter()
const goToPlay = (url) => {
  router.push({ name: 'Play', query: { url: url, from: null } })
  playStore.getPlayByUrl({ url: url })
}
</script>

<template>
  <div class="player">
    <!-- 播放器:key="urlKey" -->
    <el-col :span="18" id="app-container" class="video-box">
      <BaseArtPlayer ref="playerRef" :configs="defaultConfigs" style="width: 100%; height: 100%;" />
    </el-col>
    <!-- 信息 -->
    <el-col :span="6" class="info-box">
      <el-scrollbar class="infoElement">
        <div class="anime-info">
          <h1>{{ dramasList[0].listInfo.title }}</h1>
          <h2 style="color: #999999;">{{ dramasList[0].listInfo.episode }}</h2>
          <ul>
            <el-check-tag v-for="tag in dramasList[0].listInfo.tags" :key="tag" style="margin: 4px;" size="small"
              checked round>{{ tag }}</el-check-tag>
          </ul>
        </div>
        <div class="episodes">
          <h2>播放列表<span @click="reverse">倒序</span></h2>
          <div class="tabs">
            <span style="align-content: center">播放源：</span>
            <el-button v-for="tab in dramasList" :key="tab" class="tab" :class="{ active: activeTab == tab.listTitle }"
              @click="getList(tab)">
              {{ tab.listTitle }}
            </el-button>
          </div>
          <div class="episode-list">
            <el-button v-for="episode in tabList" :key="episode" class="episode" :class="{ active: episode.selected }"
              @click="goToPlay(episode.url)">
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
  height: calc(calc((3 / 4) * 100vw - 100px) * calc(9 / 16));

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
          font-weight: bold;
        }

        h2 {
          font-weight: bold;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      }

      .episodes {
        margin-top: 20px;

        h2 {
          margin: 0 0 10px;

          span {
            // float: right;
            margin-left: 20px;
            color: #999999;
            font-size: 16px;
            cursor: pointer;

            &:hover {
              color: $xtxColor;
            }
          }
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

            &.active {
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
