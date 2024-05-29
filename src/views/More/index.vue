<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();

</script>

<template>
  <div class="more">
    <div class="tabs">
      <div class="title">
        <h1>{{ route.query.url }}</h1>
        <a v-if="false" class="sift">筛选</a>
      </div>
      <el-divider />
    </div>
    <div class="anime-list">
      <BaseAnimeItem v-for="anime in animes" :key="anime" :anime="anime" :click-event="clickEvent" />
    </div>
  </div>
  <el-backtop :right="100" :bottom="100" />
</template>

<style scoped lang="scss">
.more {
  margin-top: 90px;
  width: 100vw;

  .tabs {
    display: flex;
    align-items: center;

    .title {
      width: 250px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        margin-left: 30px;
        display: inline-block;
        color: $blackColor1;
      }

      .sift {
        margin-right: 10px;
        font-weight: bold;
        color: #cccccc;
        cursor: pointer;

        &:hover {
          color: $xtxColor;
        }
      }
    }

    .el-divider {
      border-color: $xtxColor;
      border-width: 3px;
    }
  }

  .anime-list {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    row-gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;

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