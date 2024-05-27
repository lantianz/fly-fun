<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Hls from 'hls.js';
import { storeToRefs } from 'pinia';
import { usePlayStore } from '@/stores/play';
import { useAnimeStore } from "@/stores/anime";
const playStore = usePlayStore();
const animeStore = useAnimeStore()

// 响应式数据
const { playUrl } = storeToRefs(playStore);
const { anime } = storeToRefs(animeStore);

const videoElement = ref(null);
const video = ref(null);
const init = () => watchEffect(() => {
  video.value = videoElement.value;
})

// 方法
const show = () => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(playUrl.value);
    hls.attachMedia(video.value);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.value.play();
      console.log("加载成功");
    });

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.log("加载失败", event, data);
    });
  } else {
    console.error("不支持的格式");
  }
};
const waitData = async () => {
  await playStore.getPlay()
  await animeStore.getAnime()
  init()
  show()
}

onMounted(() => {
  scrollTo(0, 0)
  waitData()
  console.log(playUrl.value)
  console.log(anime.value)
});
</script>

<template>
  <div class="player">
    <!-- 播放器 -->
    <el-col :span="16" id="app-container" class="video-box">
      <video ref="videoElement" :src="playUrl" id="videoElement" controls class="videoElement"
        style="object-fit: contain"></video>
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
  }
}
</style>
