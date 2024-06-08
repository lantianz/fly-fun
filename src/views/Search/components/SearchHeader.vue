<script setup>
import { useScroll } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const { y } = useScroll(window)
// logo刷新
const refresh = () => location.replace('/');

const nowTime = ref(null)

const addZero = (s) => {
    return s < 10 ? ('0' + s) : s;
}
const getNowTime = () => {
    var date = new Date();
    var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
        + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
    nowTime.value = time;
}

onMounted(() => {
    getNowTime();
    clearInterval(myTimeDisplay);//销毁之前
    var myTimeDisplay = setInterval(() => {
        getNowTime(); //每秒更新一次时间
    }, 1000);
})

const imgList = [
    'https://img.moehu.org/pic.php?id=longtu',
    'https://img.moehu.org/pic.php?id=img1',
]
const avatar = ref(null)
avatar.value = imgList[Math.floor(Math.random() * imgList.length)]
const msg = ref("∑(っ°Д°;)っ别看了，我还没做这个 ┗( ▔, ▔ )┛ 刷新页面会换头像，当然，你可以点开瞅瞅")
const changeMsg = () => {
    msg.value = "没想到吧！它可能还变"
    avatar.value = imgList[Math.floor(Math.random() * imgList.length)]
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
            </ul>
            <div class="now-time">
                <span>{{ nowTime }}</span>
            </div>
            <el-popover placement="top-start" :width="250" trigger="hover" :content="msg">
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
    background-color: $whiteBgColor;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;

    &.show {
        transition: all 0.6s ease;
        opacity: 0.5;
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
            background: $logo2;
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
                color: $blackColor1;
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

    .now-time {
        margin: auto;
        text-align: center;

        span {
            font-size: 20px;
            font-weight: bold;
            color: #999999;
        }
    }

    .history {
        margin-left: 30px;

        i {
            font-size: 24px;
            color: $blackColor1;
        }
    }

    .avatar {
        width: 40px;
        height: 40px;
        margin-left: auto;
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