<template>
  <van-tag
    class="article-tag"
    v-for="tag in tags"
    :key="tag.id"
    :color="tag.color || color || '#7232dd'"
  >
    {{ tag.text }}
  </van-tag>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Tag } from '@/utils/notes/useTag'

defineProps<{ tags?: Tag[]; color?: string }>()
</script>

<style lang="scss" scoped>
.article-tag {
  margin-right: 10px;
}
</style>
