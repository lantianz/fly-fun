<script setup>
import { computed, reactive, ref } from 'vue'
import { useScroll } from '@vueuse/core'
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { useSiftStore } from '@/stores/sift';
import { usePlayStore } from '@/stores/play';
const playStore = usePlayStore();
const siftStore = useSiftStore();
const searchStore = useSearchStore();
const homeStore = useHomeStore()
const { tagObj } = storeToRefs(homeStore)

const { y } = useScroll(window)

const route = useRoute()
const getTitle = computed(() => {
    const t = ref('');
    homeStore.tagObj.tags.forEach(obj => {
        if (obj.url === route.query.id) {
            t.value = obj.title
        }
    });
    return t.value
})

const router = useRouter()
const open = (url) => {
    siftStore.siftOptions.id = url
    router.push({ path: '/More/', query: siftStore.siftOptions })
    siftStore.getSiftByID(url)
}

// 搜索
const form = reactive({
    keyword: '',
    page: 1,    //搜索结果从第一页开始
});
const onSubmit = () => {
    if (form.keyword.trim() === '') return;
    router.push({ path: '/Search', query: form })
    searchStore.getSearchByKeyword(form.keyword)
};

// 历史
const cleanHistory = () => {
    if (!localStorage.getItem('artplayer_settings')) return
    else localStorage.removeItem('artplayer_settings')
    history.splice(0)
}
const history = reactive([])
const getHistory = async () => {
    if (!localStorage.getItem('artplayer_settings')) return
    const historyObj = JSON.parse(localStorage.getItem('artplayer_settings'))
    history.splice(0)
    for (let key in historyObj.times) {
        await playStore.getPlayByUrl({ url: key })
        history.push({
            url: key,
            title: playStore.dramasList[0].listInfo.title,
            episode: playStore.dramasList[0].listInfo.episode,
        })
    }
    history.reverse()
}
const goToPlay = (url) => {
    router.push({ name: 'Play', query: { url: url, from: null } })
}

// logo刷新
const refresh = () => location.replace('/');

const imgList = [
    'https://img.moehu.org/pic.php?id=longtu',
    'https://img.moehu.org/pic.php?id=img1',
]
const avatar = ref(null)
avatar.value = imgList[Math.floor(Math.random() * imgList.length)]
</script>

<template>
    <header class="app-header" :class="{ show: y > 90 }">
        <div class="container">
            <h1 class="logo">
                <a @click="refresh">Fly Fun</a>
            </h1>
            <ul class="app-header-nav">
                <li>
                    <RouterLink to="/"><i class="iconfont icon-dianshi"></i>&nbsp;首页</RouterLink>
                </li>
                <li v-for="tag in tagObj.tags" :key="tag" @click="open(tag.url)">
                    <a :class="{ active: getTitle === tag.title }">{{ tag.title }}</a>
                </li>
            </ul>
            <div class="search">
                <el-form :model="form" @submit.prevent="onSubmit">
                    <el-form-item>
                        <input type="text" v-model="form.keyword" placeholder="请输入您要搜索的内容...">
                        <el-button class="btn-search" type="primary" @click="onSubmit"><i
                                class="iconfont icon-sousuo"></i>&nbsp;搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="route.path !== '/Play'" class="history">
                <el-popover placement="bottom" :width="500" trigger="click">
                    <template #reference>
                        <i class="iconfont icon-lishi" @click="getHistory"></i>
                    </template>
                    <h2 style="margin: 0;">播放记录<el-button style="float: right;" round type="info" size="small" @click="cleanHistory">清空记录</el-button></h2>
                    <ul style="margin-top: 20px;">
                        <li style="
                        padding: 5px;
                        border-radius: 5px;
                        background-color: #dddddd;
                        margin-top: 10px;
                        cursor: pointer;" 
                        v-for="item in history" :key="item" @click="goToPlay(item.url)">
                            <a>{{ item.title }}</a>
                            <a style="float: right;">{{ item.episode }}</a>
                        </li>
                    </ul>
                </el-popover>
            </div>
            <div class="avatar">
                <el-image :src="avatar" :zoom-rate="1.2" :max-scale="3" :min-scale="0.2" :preview-src-list="imgList"
                    :initial-index="Math.floor(Math.random() * imgList.length)" fit="cover" />
            </div>
        </div>
    </header>
</template>


<style scoped lang='scss'>
.app-header {
    width: 100vw;
    background-color: $blackBgColor;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    box-shadow: rgb(0, 0, 0) 0px 0px 20px;

    &.show {
        background-color: $whiteBgColor;
        transition: all 0.3s linear;

        .logo a {
            background: $logo2;
        }

        .app-header-nav li a {
            color: $blackColor1;
        }

        .search .el-form-item input {
            color: $blackColor1;
            background: #00000012;
        }

        .history i {
            color: $blackColor1;
        }
    }

    .container {
        width: auto;
        height: 90px;
        margin: 0 30px;
        display: flex;
        align-items: center;
    }

    .logo {
        width: 180px;

        a {
            cursor: pointer;
            display: block;
            width: 100%;
            height: 80px;
            text-indent: -9999px;
            background: $logo1;
        }
    }

    .app-header-nav {
        display: flex;

        li {
            margin-left: 20px;
            text-align: center;

            .iconfont {
                font-size: 14px;
            }

            a {
                font-family: $fontFamily;
                color: $whiteColor1;
                font-weight: 700;
                font-size: 15px;
                display: inline-block;

                &:hover {
                    color: $xtxColor;
                }

                &.active {
                    color: $xtxColor;
                }
            }

            .active {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }
    }

    .search {
        margin-left: auto;

        .el-form-item {
            margin: 0;
            position: relative;
            height: 40px;

            input {
                max-width: 360px;
                min-width: 300px;
                height: 100%;
                padding-left: 12px;
                border-radius: 40px;
                font-weight: bold;
                color: $whiteColor1;
                background: #ffffff66;
            }

            .btn-search {
                position: absolute;
                top: 0;
                right: -1px;
                height: 40px;
                border: none;
                border-radius: 40px;
                background: $xtxColor;
                color: #fff;

                &:hover {
                    background: #aaa;
                    color: #666;
                }

                .iconfont {
                    font-size: 14px;
                }
            }
        }
    }

    .history {
        margin-left: 30px;

        i {
            font-size: 24px;
            color: $whiteColor1;
        }
    }

    .avatar {
        width: 40px;
        height: 40px;
        margin-left: 30px;
        cursor: pointer;

        .el-image {
            width: 100%;
            min-width: 40px;
            height: 100%;
            min-height: 40px;
            border-radius: 40px;
        }
    }
}
</style>