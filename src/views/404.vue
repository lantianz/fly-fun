<script setup>
import { onMounted, ref } from "vue";

const imgList = ref([
    { src: "https://image.dbbqb.com/202405271700/0cefc61b6bae909336f0ae9fb89204bf/k1D70", alt: "404" },
    { src: "https://image.dbbqb.com/202405271659/898d2ce5d7f49282f8031deb78b5ec78/4zGbG", alt: "404" },
    { src: "https://image.dbbqb.com/202405271658/34c1bbf29a6f142ff05abeadbd69dd9a/9NonG", alt: "404" },
    { src: "https://image.dbbqb.com/202405271723/3d9bee5dce7767d6ef453b57d0124dbb/2eYbG", alt: "404" },
    { src: "https://image.dbbqb.com/202405271724/200a19764a2a0323a84d942be7602419/QzxEW", alt: "404" },
]);
const img = ref({});

onMounted(() => {
    img.value = imgList.value[Math.floor(Math.random() * imgList.value.length)];
});
</script>

<template>
    <div class="err404">
        <h1>404</h1>
        <h2>这啥也没有啊</h2>
        <h3>
            <router-link to="/" class="go-home">去首页</router-link>
        </h3>
        <img :src="img.src" :alt="img.alt" />
    </div>
</template>

<style scoped lang="scss">
.err404 {
    margin: auto;
    width: 280px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .go-home {
        width: 130px;
        height: 38px;
        background: $xtxColor;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        display: inline-block;
        border-radius: 38px
    }
    img {
        margin-top: 10px;
        border-radius: 20px;
    }
}
</style>