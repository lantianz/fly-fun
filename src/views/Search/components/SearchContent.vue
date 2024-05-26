<template>
    <div>
        <el-input v-model="searchQuery" placeholder="搜索" class="search-bar"></el-input>
        <div class="result-list">
            <el-card v-for="(item, index) in paginatedResults" :key="index" class="result-card">
                <img :src="item.image" class="result-image" />
                <div class="result-content">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                    <el-button type="primary">查看详情</el-button>
                </div>
            </el-card>
        </div>
        <el-pagination background layout="prev, pager, next" :total="totalResults" :page-size="pageSize"
            @current-change="handlePageChange"></el-pagination>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

const results = ref([
    {
        image: 'path/to/image1.jpg',
        title: '少女与战车 剧场版',
        description: '一些描述...',
    },
    {
        image: 'path/to/image2.jpg',
        title: '摇滚都市 第四季',
        description: '一些描述...',
    },
    {
        image: 'path/to/image3.jpg',
        title: '逆转世界的电池少女',
        description: '一些描述...',
    },
    // 添加更多条目...
]);

const filteredResults = computed(() => {
    return results.value.filter(item => item.title.includes(searchQuery.value));
});

const totalResults = computed(() => {
    return filteredResults.value.length;
});

const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return filteredResults.value.slice(start, end);
});

const handlePageChange = (page) => {
    currentPage.value = page;
};
</script>

<style scoped>
.search-bar {
    margin: 20px;
    width: 300px;
}

.result-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.result-card {
    width: 300px;
    margin: 20px;
}

.result-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.result-content {
    padding: 20px;
}
</style>