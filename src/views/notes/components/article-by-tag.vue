<template>
  <button
    class="article-tag"
    v-for="tag in allTagList"
    :key="tag.id"
    @click="handleClickTag(tag.objId)"
  >
    {{ tag.text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue'
import { useTagList } from '../utils/useTag'
// const props = defineProps<{ isShow?: boolean }>()
const emit = defineEmits(['click'])

const { allTagList } = useTagList()

const handleClickTag = (objId: string) => {
  emit('click', objId)
}
</script>

<style lang="scss" scoped></style>
