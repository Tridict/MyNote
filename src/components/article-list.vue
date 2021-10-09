<template>
  <van-checkbox-group v-model="checked">
    <van-cell-group
      inset
      class="article-item"
      v-for="article in articleList"
      :key="article.id"
    >
      <van-row>
        <transition name="checkbox">
          <van-checkbox
            class="expand-checkbox"
            v-if="showCheckbox"
            :name="article.id"
            :ref="(el) => (checkboxRefs[article.id] = el)"
            @click.stop
          ></van-checkbox>
        </transition>
        <SwipeCell
          :postId="article.postId"
          :getArticleList="getArticleList"
          class="checkbox-right"
          @click.capture="handleClicks(article.id)"
        >
          <van-cell :label="article.time" @click.stop="onEdit(article.postId)">
            <template #title>
              <div class="article-title van-ellipsis">{{ article.title }}</div>
              <ArticleTag :tags="article.tags" />
              <div class="van-multi-ellipsis--l3">
                {{ article.abstract }}
              </div>
            </template>
          </van-cell>
        </SwipeCell>
      </van-row>
    </van-cell-group>
  </van-checkbox-group>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Article } from '@/utils/notes/useArticle'
import { useCheckbox } from '@/utils/useCheckbox'
import ArticleTag from '@/components/common/article-tag.vue'
import SwipeCell from '@/components/article-swipe-cell.vue'

const props = defineProps<{
  articleList: Article[]
  showCheckbox: boolean
  getArticleList: () => Promise<void>
}>()

const router = useRouter()
const onEdit = (postId: string) => {
  if (!props.showCheckbox) {
    router.push('/post?id=' + postId)
  }
}
const { checked, checkboxRefs, toggleCheckbox } = useCheckbox()

const handleClicks = (index: number) => {
  if (props.showCheckbox) {
    // console.log(index)
    toggleCheckbox(index)
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  margin: 0 $margin-items $margin-items;
  .article-title {
    font-weight: 700;
    color: $text-black;
  }
}

:deep().van-cell__title {
  max-width: 100%;
}
</style>

<style lang="scss" scoped>
.checkbox-right {
  flex: 1;
}

.expand-checkbox {
  margin-left: $margin-items;
  transform: translateX(0);
  opacity: 1;
  // width: 1.2em;
  overflow: visible;
}

.checkbox-enter-from,
.checkbox-leave-to {
  margin-left: 0;
  transform: translateX(-1rem);
  opacity: 0;
  width: 0;
}

.checkbox-enter-to,
.checkbox-leave-from {
  // margin-left: 2rem;
  transform: translateX(0);
  opacity: 1;
  // width: 1.2em;
}

.checkbox-leave-active,
.checkbox-enter-active {
  transition: all 0.2s ease-out;
}
</style>
