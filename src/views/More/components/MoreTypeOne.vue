<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHomeStore } from '@/stores/home';
import { useSiftStore } from '@/stores/sift';
import { storeToRefs } from 'pinia';
const route = useRoute();
const homeStore = useHomeStore()
const getTitle = computed(() => {
  const t = ref('');
  homeStore.tagObj.tags.forEach(obj => {
    if (obj.url === route.query.id) {
      t.value = obj.title
    }
  });
  return t.value
})

const siftStore = useSiftStore();
siftStore.getSift();
const { pageCount, vodDataBean, classificationDataBeans } = storeToRefs(siftStore);

const show = reactive({
  isShow: true,
  title: '关闭筛选栏'
})
const showSift = () => {
  if (show.isShow) {
    show.isShow = false
    show.title = '打开筛选栏'
  } else {
    show.isShow = true
    show.title = '关闭筛选栏'
  }
}

const reset = () => {
  for (let i = 0; i < 6; i++) {
    activeTab.value[i] = '全部'
    siftStore.siftOptions.type = ''
    siftStore.siftOptions.area = ''
    siftStore.siftOptions.year = ''
    siftStore.siftOptions.lang = ''
    siftStore.siftOptions.latter = ''
    siftStore.siftOptions.by = ''
  }
  router.push({ path: '/More/', query: siftStore.siftOptions })
  siftStore.getSift()
}

const activeTab = ref(['全部', '全部', '全部', '全部', '全部', '全部'])

const select = (index, classTitle, item) => {
  activeTab.value[index - 1] = item.title
  siftStore.siftOptions.id = route.query.id
  switch (classTitle) {
    case '类型':
      siftStore.siftOptions.type = item.url
      break
    case '地区':
      siftStore.siftOptions.area = item.url
      break
    case '年份':
      siftStore.siftOptions.year = item.url
      break
    case '语言':
      siftStore.siftOptions.lang = item.url
      break
    case '字母':
      siftStore.siftOptions.latter = item.url
      break
    case '排序':
      siftStore.siftOptions.by = item.url
      break
  }
  router.push({ path: '/More/', query: siftStore.siftOptions })
  siftStore.getSift()
}

const changePage = (val) => {
  siftStore.siftOptions.page = val
  router.push({ path: '/More/', query: siftStore.siftOptions })
  siftStore.getSift()
}

const router = useRouter()
const goToAnime = (url) => router.push({ path: '/Anime', query: { url: url } })

onMounted(() => {
  reset()
  scrollTo(0, 0)
})
</script>

<template>
  <div class="more">
    <div class="tabs">
      <div class="title">
        <h1>当前列表：{{ getTitle }}</h1>
        <span class="sift-btn" @click="showSift">{{ show.title }}</span>
        <span class="reset-btn" @click="reset" v-show="show.isShow">重置筛选</span>
      </div>
      <div class="sift" v-show="show.isShow">
        <div class="sift-content" v-for="classification in classificationDataBeans" :key="classification">
          <div class="classfication-title">{{ classification.classificationTitle }}</div>
          <ul class="classfication-content">
            <li class="item-tag" v-for="(item, index) in classification.itemList" :key="index">
              <a :class="{ active: activeTab[classification.index - 1] == item.title }"
                @click="select(classification.index, classification.classificationTitle, item)">{{
                  item.title
                }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="anime-list-header">
      <h1 style="text-align: center; margin: 20px;">共{{ pageCount }}页结果</h1>
      <el-pagination background layout="prev, pager, next" :page-count="pageCount" @current-change="changePage" />
    </div>
    <div class="anime-list">
      <el-empty description="暂无数据" v-show="!vodDataBean.itemList" />
      <BaseAnimeItem v-for="anime in vodDataBean.itemList" :key="anime" :anime="anime" :click-event="goToAnime" />
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.more {
  margin-top: 90px;
  width: 100vw;

  .tabs {
    margin: 0 10%;
    padding: 30px 0;

    .title {
      display: flex;
      align-items: center;
      margin: 0 0 20px 20px;

      h1 {
        display: inline-block;
        color: $blackColor1;
      }

      .sift-btn {
        margin-left: 30px;
        font-weight: bold;
        color: #999999;
        cursor: pointer;

        &:hover {
          color: $xtxColor;
        }
      }

      .reset-btn {
        margin-left: auto;
        margin-right: 30px;
        font-weight: bold;
        color: #999999;
        cursor: pointer;

        &:hover {
          color: $xtxColor;
        }
      }
    }

    .sift {
      padding: 10px;
      border-radius: 12px;
      background-color: #dedede80;

      .sift-content {
        display: flex;

        .classfication-title {
          width: 40px;
          margin: 10px;
          font-weight: bold;
        }

        .classfication-content {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin: 10px;
          width: 100%;

          .item-tag {

            a {
              margin: 10px;
              cursor: pointer;

              &.active {
                color: $xtxColor;
                font-weight: bold;
              }
            }

          }
        }
      }

    }
  }

  .anime-list-header {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 90%;
  }

  .anime-list {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    row-gap: 20px;
    flex-wrap: wrap;
    margin: 0 30px;
    min-height: 300px;
    position: relative;

    .el-empty {
      position: absolute;
      bottom: 25%;
    }

    .anime-item {
      width: 200px;
      text-align: center;

      .el-image {
        width: 200px;
        height: 300px;
        border-radius: 10px;
      }

      .anime-info {
        margin-top: 10px;
      }
    }
  }
}
</style>