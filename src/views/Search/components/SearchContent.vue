<script setup>
import { onMounted, reactive, ref, toRefs, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useSearchStore } from '@/stores/search';
const searchStore = useSearchStore();
const router = useRouter()
const route = useRoute()

const props = defineProps(['result'])
const { result } = toRefs(props)
const { pageCount, vodDataBean } = toRefs(result.value)

const form = reactive({
    keyword: '',
    page: 1,    //搜索结果从第一页开始
});
form.keyword = route.query.keyword
const onSubmit = () => {
    if (form.keyword != null && form.keyword.trim() !== '') {
        router.push({ path: '/Search', query: { keyword: form.keyword, page: 1 } })
        searchStore.getSearchByKeyword(form.keyword)
    }
};

const changePage = (val) => {
    router.push({ path: '/Search', query: { keyword: form.keyword, page: form.page } })
    searchStore.getSearchByPage(val)
}

watchEffect(() => {
    document.title = '搜索'+route.query.keyword+'-FlyFun'
})

const imgList = ref([
    { src: "https://img.moehu.org/pic.php?id=longtu", alt: "404" },
    { src: "https://img.moehu.org/pic.php?id=huaji", alt: "404" },
    { src: "https://img.moehu.org/pic.php?id=pand", alt: "404" },
]);

const img = ref({ src: "https://img.moehu.org/pic.php?id=longtu", alt: "404" });
onMounted(() => {
    img.value = imgList.value[Math.floor(Math.random() * imgList.value.length)];
});

const goToAnime = (url) => router.push({ path: '/Anime', query: { url: url } })
</script>

<template>
    <div class="search">
        <div class="search-box">
            <el-form :model="form" @submit.prevent="onSubmit">
                <el-form-item>
                    <input type="text" v-model="form.keyword" placeholder="请输入您要搜索的内容...">
                    <el-button class="btn-search" type="primary" @click="onSubmit"><i
                            class="iconfont icon-sousuo"></i>&nbsp;搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="result-header">
            <h1>搜索结果</h1>
            <el-pagination :page-size="12" background layout="prev, pager, next" :page-count="pageCount"
                @current-change="changePage" />
        </div>
        <div class="result-list" v-if="pageCount">
            <el-card class="result-card" v-for="item in vodDataBean.itemList" :key="item">
                <el-image v-if="item.img" :src="item.img" :lazy="true" @click="goToAnime(item.url)">
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
                <div class="result-content">
                    <h1 @click="goToAnime(item.url)">{{ item.title }}</h1>
                    <ul>
                        <el-check-tag size="small" checked round>{{ item.topLeftTag }}</el-check-tag>
                        <el-check-tag size="small" checked round>{{ item.episodesTag }}</el-check-tag>
                    </ul>
                    <p>{{ item.introduce }}</p>
                    <el-button @click="goToAnime(item.url)" type="primary">查看详情</el-button>
                </div>
            </el-card>
        </div>
        <div class="err404" v-if="!pageCount">
            <h2>啥也没搜到啊</h2>
            <img :src="img.src" :alt="img.alt" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/styles/loader.scss';

.search {
    width: 100vw;
    background-color: $whiteBgColor;

    .search-box {
        width: 100%;
        padding: 20px;

        .el-form {
            display: flex;
            justify-content: center;

            .el-form-item {
                margin: 0;
                position: relative;
                width: 60%;
                height: 60px;

                input {
                    width: 100%;
                    height: 100%;
                    padding-left: 20px;
                    border-radius: 999px;
                    font-size: 20px;
                    font-weight: bold;
                    color: $blackColor1;
                    background: #aaaaaa44;
                }

                .btn-search {
                    position: absolute;
                    top: 0;
                    right: -1px;
                    width: 15%;
                    height: 100%;
                    border: none;
                    border-radius: 999px;
                    background: $xtxColor;
                    font-size: 20px;
                    font-weight: bold;
                    color: #ffffff;

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
    }

    .result-header {
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 80%;
    }

    .result-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        width: 100%;

        .result-card {
            width: 90%;
            height: fit-content;
            margin-bottom: 20px;
            border-radius: 12px;
            background: #eeeeee;

            ::v-deep .el-card__body {
                display: flex;
                flex-direction: row;
            }

            .el-image {
                transition: all 0.4s;
                cursor: pointer;
                width: 200px;
                min-width: 200px;
                height: 300px;
                max-height: 300px;
                border-radius: 20px;

                &:hover {
                    transform: scale(1.1);
                    filter: brightness(0.6);
                }
            }

            .result-content {
                height: 300px;
                max-height: 300px;
                position: relative;
                margin-left: 20px;

                h1 {
                    cursor: pointer;

                    &:hover {
                        transition: 0.3s;
                        color: $xtxColor;
                    }
                }

                .el-check-tag {
                    margin: 10px 10px 10px 0;
                }

                p {
                    max-height: 135px;
                    overflow: auto;
                    margin: 10px 0 10px 0;
                    font-size: 16px;
                    font-weight: bold;
                    color: $blackColor1;
                }

                .el-button {
                    position: absolute;
                    bottom: 0;
                    width: calc(100% - 10px);
                    border-radius: 999px;
                }
            }
        }
    }

    .err404 {
        margin: auto;
        width: 75vw;
        height: 75vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        img {
            object-fit: scale-down;
            margin-top: 10px;
            border-radius: 20px;
        }
    }
}
</style>