<script setup>
import { ref, onMounted, onUnmounted, toRefs } from 'vue';
import Artplayer from "artplayer";
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';

const props = defineProps(['configs'])
const { configs } = toRefs(props)

const art = ref(null);
const clientWidth = ref(1920)
const clientHeight = ref(1080)

const init = () => {
    art.value = new Artplayer({
        container: '.playerArt',
        id: configs.value.id,
        url: configs.value.url,
        poster: configs.value.poster,
        autoplay: configs.value.autoplay,
        volume: configs.value.volume,
        icons: configs.value.icons,
        autoPlayback: configs.value.autoPlayback,
        plugins: [
            artplayerPluginHlsQuality({
                control: true,
                setting: true,
                // 画质
                getResolution: (level) => level.height + 'P',

                // I18n
                title: 'Quality',
                auto: 'Auto',
            }),
        ],
        // type: 'm3u8',
        customType: {
            m3u8: function playM3u8(video, url, art) {
                if (Hls.isSupported()) {
                    if (art.hls) art.hls.destroy();
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                    art.hls = hls;
                    art.on('destroy', () => hls.destroy());
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = url;
                } else {
                    art.notice.show = 'Unsupported playback format: m3u8';
                }
            }
        },
        pip: true,
        mutex: false,
        screenshot: true,
        setting: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        playsInline: true,
        theme: '#27ba9b',
        lang: 'zh-cn',
        moreVideoAttr: {
            crossOrigin: 'anonymous',
        },
        contextmenu: [
            {
                html: 'FLY FUN BY LTZ',
                click: function (contextmenu) {
                    console.info('JUST HAVE A FUN TIME');
                    contextmenu.show = false;
                },
            },
        ],
        // thumbnails: {
        //     url: '/assets/sample/thumbnails.png',
        //     number: 60,
        //     column: 10,
        // },   // 预览图
        highlight: [
            {
                time: 90,
                text: '这里跳OP（不好说）',
            }
        ],
        // fullscreenWeb: true, // 网页全屏
        // miniProgressBar: true,
        // autoSize: true,
        // autoMini: false,
    });
};
const destroy = () => {
    art.value.destroy();
};

defineExpose({ init, destroy })

onMounted(() => {
    clientWidth.value = document.body.clientWidth
    clientHeight.value = document.body.clientHeight
    window.addEventListener('resize', () => {
        clientWidth.value = document.body.clientWidth
        clientHeight.value = document.body.clientHeight
    }, false)
})

onUnmounted(() => {
    art.value?.destroy()
});

</script>

<template>
    <div class="playerArt" style="width: 1000px;height: 500px;"></div>
</template>

<style lang="scss" scoped>
</style>