<script setup>
import { onMounted, ref } from "vue";

const imgList = ref([
    { src: "https://img.moehu.org/pic.php?id=longtu", alt: "404" },
    { src: "https://img.moehu.org/pic.php?id=huaji", alt: "404" },
    { src: "https://img.moehu.org/pic.php?id=pand", alt: "404" },
]);

const img = ref({ src: "https://img.moehu.org/pic.php?id=longtu", alt: "404" });
onMounted(() => {
    document.title = '404-FlyFun'
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
    height: 100vh;
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