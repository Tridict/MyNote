<template>
  <!-- <div>请点击标签筛选笔记：</div> -->
  <van-dropdown-menu active-color="#1989fa">
    <van-dropdown-item v-model="selected" :options="options" />
  </van-dropdown-menu>
</template>

<script setup lang="ts">
import { defineEmits, ref, watch } from 'vue'
import { useTagList } from '../utils/useTag'
const emit = defineEmits(['click'])

const { allTagList } = useTagList()

const options = ref([{ text: '全部', value: '' }])
const selected = ref(options.value[0].value)

watch(allTagList, () => {
  options.value = [
    options.value[0],
    ...allTagList.value.map((tag) => ({
      text: tag.text,
      value: tag.objId
    }))
  ]
  selected.value = options.value[0].value
})

watch(selected, () => {
  emit('click', selected.value)
})
</script>

<style lang="scss" scoped></style>
