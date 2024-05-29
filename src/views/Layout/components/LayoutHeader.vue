<script setup>
import { ref } from 'vue'
import { useScroll } from '@vueuse/core'
import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const homeStore = useHomeStore()
const { tagObj } = storeToRefs(homeStore)

const { y } = useScroll(window)

const router = useRouter()
const open = (url) => router.push({ path: '/More/', query: { url: url } })
// 搜索
const form = ref({
    keyword: '',
    page: 1,    //搜索结果从第一页开始
});
const onSubmit = () => {
    if (form.value.keyword.trim() === '') return;
    router.push({ path: '/Search', query: form.value })
};
// logo刷新
const refresh = () => location.replace('/');

const imgList = [
    'https://img.moehu.org/pic.php?id=longtu',
    'https://img.moehu.org/pic.php?id=img1',
]
const avatar = ref(null)
avatar.value = imgList[Math.floor(Math.random() * imgList.length)]
const msg = ref("∑(っ°Д°;)っ别看了，我还没做这个 ┗( ▔, ▔ )┛ 刷新页面会换头像，当然，你可以点开瞅瞅")
const changeMsg = () => {
    msg.value = "没想到吧！它可能还变"
}
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
                    <a>{{ tag.title }}</a>
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
            <!-- <div class="history">
                <RouterLink to="/history"><i class="iconfont icon-lishi"></i></RouterLink>
            </div> -->
            <el-popover placement="top-start" :width="250" trigger="hover"
                :content="msg">
                <template #reference>
                    <div class="avatar" @click="changeMsg">
                        <el-image :src="avatar" :zoom-rate="1.2" :max-scale="3" :min-scale="0.2"
                            :preview-src-list="imgList" :initial-index="Math.floor(Math.random() * imgList.length)"
                            fit="cover" />
                    </div>
                </template>
            </el-popover>
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
                width: 384px;
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
            height: 100%;
            border-radius: 40px;
        }
    }
}
</style>