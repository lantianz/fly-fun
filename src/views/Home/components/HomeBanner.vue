<script setup>
import { onMounted, ref } from 'vue';
import { getIndexAPI } from '@/apis/home';
const indexList = ref([])
const getIndex = async () => {
    const res = await getIndexAPI()
    indexList.value = res.data.banner
}
onMounted(() => {
    getIndex()
})
</script>

<template>
    <div class="home-banner">
        <el-carousel arrow="never" :interval="4000" type="card" height="calc(100vh - 90px)">
            <el-carousel-item v-for="item in indexList" :key="item">
                <el-image class="banner-img" :src="item.cover" :lazy="true">
                    <template #placeholder>
                        <div class="image-slot"><h1 class="dot">Loading...</h1></div>
                    </template>
                </el-image>
                <div class="banner-info">
                    <h1>{{ item.title }}</h1>
                    <p>{{ item.title }}</p>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped lang="scss">
.home-banner {
    background: url('@/assets/images/logo-bg.png') no-repeat;
    background-size: contain;
    background-position: center top;

    .el-carousel {

        .el-carousel__item {
            // width: calc(100vw * 0.75);
            border-radius: 20px;
        }

        .banner-img {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;

            .image-slot {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                background: #cccccccc;
                font-size: 14px;
            }

            .dot {
                color: #fff;
            }
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