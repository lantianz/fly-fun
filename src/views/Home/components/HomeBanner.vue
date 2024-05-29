<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHomeStore } from '@/stores/home';

const homeStore = useHomeStore()

const router = useRouter()
const now = ref(0)
// 点击两侧幻灯片不跳转
const goToAnime = (index, url) => {
    if(index === now.value){
        router.push({ path: '/Anime', query: { url: url }})
    } else {
        return
    }
}
// 获取当前幻灯片索引
const changeCarousel = (index) => {
    now.value = index
}

</script>

<template>
    <div class="home-banner">
        <el-carousel arrow="never" :interval="4000" type="card" height="calc(100vh - 90px)" @change="changeCarousel">
            <el-carousel-item v-for="(item, index) in homeStore.bannerObj.items" :key="item" @click="goToAnime(index, item.url)">
                <el-image class="banner-img" :src="item.img" lazy>
                    <template #placeholder>
                        <div class="load">
                            <div class="loader"></div>
                        </div>
                    </template>
                    <template #error>
                        <div class="load">
                            <div class="loader"></div>
                        </div>
                    </template>
                </el-image>
                <div class="banner-info">
                    <h1>{{ item.title }}</h1>
                    <p>{{ item.episodes }}</p>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
@import '@/styles/loader.scss';

.home-banner {
    background: url('@/assets/images/logo-bg.png') no-repeat;
    background-size: contain;
    background-position: center top;

    .el-carousel {

        .el-carousel__item {
            // width: calc(100vw * 0.75);
            border-radius: 20px;
        }

        ::v-deep .el-carousel__button {
            height: 20px;
            border-radius: 20px;
        }

        .banner-img {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;

        }

        .banner-info {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 80%;
            left: 5%;
            color: $whiteColor1;

            h1 {
                font-weight: 700;
            }
        }

        // ::v-deep .el-carousel__indicators--horizontal {
        //     left: calc(75% / 2 + 50% / 2);
        // }
    }

}
</style>