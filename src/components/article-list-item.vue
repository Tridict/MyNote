<template>
  <van-cell :label="article.time">
    <template #title>
      <div class="article-title van-ellipsis">{{ article.title }}</div>
      <van-tag
        class="article-tag"
        v-for="tag in article.tags"
        :key="tag.id"
        :color="tag.color || '#7232dd'"
      >
        {{ tag.text }}
      </van-tag>
      <div class="van-multi-ellipsis--l3">
        {{ article.abstract }}
      </div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Article } from '@/utils/useArticle'

defineProps<{ article: Article }>()
</script>

<style lang="scss" scoped>
.article-title {
  font-weight: 700;
  color: $text-black;
}
.article-tag {
  margin-right: 10px;
}
:deep().van-cell__title {
  max-width: 100%;
}
</style>
