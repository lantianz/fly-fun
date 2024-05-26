<script setup>
import { ref, toRefs, watchEffect } from 'vue';
const props = defineProps(['lineNum', 'lineCount', 'aObj'])

const { lineNum, lineCount, aObj } = toRefs(props)

const isNull = (val) => {
    if (val == null || val == undefined || val == "") {
        return true
    }
    return false
}

const lineNumD = isNull(lineNum.value) ? 1 : lineNum.value  // 有几行
const lineCountD = isNull(lineCount.value) ? 6 : lineCount.value    // 每行显示的个数

const pageIndex = ref(0)
const data = ref([])
const group = () => {
    let index = 0;
    const newArray = [];
    while (index < aObj.value.items.length) {
        newArray.push(aObj.value.items.slice(index, index += (lineCountD * lineNumD)));
    }
    return newArray;
}

const before = () => {
    if (pageIndex.value < 1) {
        return
    }
    data.value = group()[pageIndex.value - 1]
    pageIndex.value -= 1
}
const after = () => {
    if (pageIndex.value >= Math.ceil(aObj.value.items.length / (lineCountD * lineNumD)) - 1) {
        return
    }
    data.value = group()[pageIndex.value + 1]
    pageIndex.value += 1
}

watchEffect(() => {
    data.value = group()[pageIndex.value]
})

defineExpose({
    data
})
</script>

<template>
    <div class="pager">
        <a @click="before">&lt;</a>
        <span>{{ pageIndex + 1 }}</span>
        <span>&nbsp;/&nbsp;</span>
        <span>{{ Math.ceil(aObj.items.length / (lineCountD * lineNumD)) }}</span>
        <a @click="after">&gt;</a>
    </div>
</template>

<style scoped lang="scss">

    .pager {
        width: fit-content;
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