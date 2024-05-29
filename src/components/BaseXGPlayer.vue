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
        id: configs.value.playerId, 
        isLive: false, 
        autoplayMuted: configs.value.autoplayMuted, 
        autoplay: configs.value.autoplay, 
        volume: configs.value.volume,
        plugins: getPlugins(), 
        poster: configs.value.poster, 
        url: configs.value.url, 
        fitVideoSize: configs.value.fitVideoSize,
        height: configs.value.height * (clientHeight.value / 1080),
        width: configs.value.width * (clientWidth.value / 1920),
        lang: 'zh-cn',
        controls: configs.value.controls, 
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