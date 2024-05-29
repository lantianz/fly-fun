<script setup>
import Player from 'xgplayer'
import FlvPlugin from 'xgplayer-flv'
import HlsPlugin from 'xgplayer-hls.js'
import Mp4Plugin from 'xgplayer-mp4'
import 'xgplayer/dist/index.min.css'
import { ref, watch, onMounted, onUnmounted, defineProps, toRefs } from 'vue'

const props = defineProps(['configs'])
const { configs } = toRefs(props)

const player = ref(null)
const clientWidth = ref(1920)
const clientHeight = ref(1080)

const getPlugins = () => {
    let plugins = [Mp4Plugin]
    switch (configs.value.plugin) {
        case 'hls':
            plugins = [HlsPlugin]
            break
        case 'flv':
            plugins = [FlvPlugin]
            break
        default:
            plugins = [Mp4Plugin]
            break
    }
    return plugins
}

const init = () => {
    player.value = new Player({
        id: configs.value.playerId, // 玩家ID
        isLive: false, // 是否为直播
        autoplayMuted: configs.value.autoplayMuted, // 自动播放且静音
        autoplay: configs.value.autoplay, // 自动播放
        volume: configs.value.volume,
        plugins: getPlugins(), // 使用的插件列表
        poster: configs.value.poster, //封面图
        url: configs.value.url, // 视频源URL
        fitVideoSize: configs.value.fitVideoSize, // 视频尺寸适应方式
        // 根据当前客户端窗口尺寸调整视频高度和宽度
        height: configs.value.height * (clientHeight.value / 1080),
        width: configs.value.width * (clientWidth.value / 1920),
        lang: 'zh-cn', // 设置语言为简体中文
        controls: configs.value.controls, // 是否显示控制条
        errorTips: `好像有点问题？<span>刷新</span>试试`,
        // cssFullscreen: false,
        rotateFullscreen: true,
        ignores: configs.value.ignores,
    })
}

onMounted(() => {
    init()
    clientWidth.value = document.body.clientWidth
    clientHeight.value = document.body.clientHeight
    window.addEventListener('resize', () => {
        clientWidth.value = document.body.clientWidth
        clientHeight.value = document.body.clientHeight
        init()
    }, false)
})

watch(() => configs.value.url, () => {
    init()
}, { deep: true })

// 销毁播放器
onUnmounted(() => {
    player.value?.destroy()
})
</script>

<template>
    <div :id="configs.playerId" style="border-radius: 16px;"></div>
</template>