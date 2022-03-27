<template>
  <template v-if="mode && mode === 'button'">
    <van-button
      class="article-tag"
      size="small"
      v-for="tag in tags"
      :key="tag.id"
      :color="tag.color || color || '#7232dd'"
    >
      {{ tag.text }}
    </van-button>
  </template>
  <template v-else>
    <van-tag
      class="article-tag"
      v-for="tag in tags"
      :key="tag.id"
      :color="tag.color || color || '#7232dd'"
    >
      {{ tag.text }}
    </van-tag>
  </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Tag } from '../utils/useTag'

defineProps<{ tags?: Tag[]; color?: string; mode?: string }>()
</script>

<style lang="scss" scoped>
.article-tag {
  margin: 3px 10px 3px 0;
}
</style>
