<template>
  <van-cell :label="article.time">
    <template #title>
      <div class="article-title van-ellipsis">{{ article.title }}</div>
      <ArticleTag :tags="article.tags" />
      <div class="van-multi-ellipsis--l3">
        {{ article.abstract }}
      </div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Article } from '@/utils/notes/useArticle'
import ArticleTag from '@/components/common/article-tag.vue'

defineProps<{ article: Article }>()
</script>

<style lang="scss" scoped>
.article-title {
  font-weight: 700;
  color: $text-black;
}

:deep().van-cell__title {
  max-width: 100%;
}
</style>
