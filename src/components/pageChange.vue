<script setup>
import { onMounted, ref } from 'vue';
const { lineNum, lineCount, animeObj } = defineProps(['lineNum', 'lineCount', 'animeObj'])

const isNull = (val) => {
    if (val == null || val == undefined || val == "") {
        return true
    }
    return false
}

let lineNumD = 2
let lineCountD = 6
lineNumD = isNull(lineNum) ? 2 : lineNum
lineCountD = isNull(lineCount) ? 6 : lineCount

const pageIndex = ref(0)
const animes = ref([])
const group = () => {
    let index = 0;
    const newArray = [];
    while (index < animeObj.items.length) {
        newArray.push(animeObj.items.slice(index, index += (lineCountD * lineNumD)));
    }
    return newArray;
}

const before = () => {
    if (pageIndex.value < 1) {
        return
    }
    animes.value = group()[pageIndex.value - 1]
    pageIndex.value -= 1
}
const after = () => {
    if (pageIndex.value >= Math.ceil(animeObj.items.length / (lineCountD * lineNumD)) - 1) {
        return
    }
    animes.value = group()[pageIndex.value + 1]
    pageIndex.value += 1
}
onMounted(() => {
    animes.value = group()[pageIndex.value]
})

defineExpose({
    before,
    after,
    animes
})
</script>

<template>
    <div class="pager" v-if="animeObj.items.length > (lineCountD * lineNumD)">
        <a @click="before">&lt;</a>
        <span>{{ pageIndex + 1 }}</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{{ Math.ceil(animeObj.items.length / (lineCountD * lineNumD)) }}</span>
        <a @click="after">&gt;</a>
    </div>
</template>

<style scoped lang="scss">

    .pager {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
        color: #cccccc;

        a {
            color: #cccccc;
            font-size: 22px;
            margin: 0 10px;
            cursor: pointer;

            &:hover {
                color: $xtxColor;
            }
        }
    }

</style>