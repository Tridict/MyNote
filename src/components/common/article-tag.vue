<template>
  <van-tag
    class="article-tag"
    v-for="tag in tags"
    :key="tag.id"
    :color="tag.color || '#7232dd'"
  >
    {{ tag.text }}
  </van-tag>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Tag } from '@/utils/notes/useArticle'

defineProps<{ tags?: Tag[] }>()
</script>

<style lang="scss" scoped>
.article-tag {
  margin-right: 10px;
}
</style>
