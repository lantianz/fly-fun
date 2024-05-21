<script setup>
import { useScroll } from '@vueuse/core'

const { y } = useScroll(window)
</script>

<template>
    <header class="app-header" :class="{ show: y > 90 }">
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">Fly Fun</RouterLink>
            </h1>
            <ul class="app-header-nav">
                <li class="home">
                    <RouterLink to="/"><i class="iconfont icon-dianshi"></i>&nbsp;首页</RouterLink>
                </li>
                <li>
                    <RouterLink to="/"><i class="iconfont icon-paiban"></i>&nbsp;周番剧表</RouterLink>
                </li>
                <li>
                    <RouterLink to="/"><i class="iconfont icon-riman"></i>&nbsp;完结日漫</RouterLink>
                </li>
                <li>
                    <RouterLink to="/"><i class="iconfont icon-guoman"></i>&nbsp;热门国漫</RouterLink>
                </li>
            </ul>
            <div class="search">
                <form>
                    <input type="text" placeholder="请输入您要搜索的内容...">
                    <el-button class="btn-search" type="primary"><i
                            class="iconfont icon-sousuo"></i>&nbsp;搜索</el-button>
                </form>
            </div>
            <div class="history">
                <RouterLink to="/history"><i class="iconfont icon-lishi"></i></RouterLink>
            </div>
            <div class="avatar">
                <RouterLink to="/profile"><el-avatar src="src/assets/images/avatar.jpg" /></RouterLink>
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

        .search form input {
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
            margin-left: 36px;
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

        form {
            position: relative;
            height: 40px;

            input {
                width: 384px;
                height: 100%;
                padding-left: 12px;
                border-radius: 40px;
                color: #66666622;
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
        border-radius: 40px;
        margin-left: 30px;
    }
}
</style>