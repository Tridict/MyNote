<template>
  <Page title="MyNote" current="notes">
    <template #title-left>
      <van-button size="small" @click="handleSync">
        <Icon name="sync" />
      </van-button>
    </template>
    <template #title-right>
      <van-button size="small" @click="showCheckbox = !showCheckbox">
        <Icon name="showMore" />
      </van-button>
      <van-button size="small" to="/post">
        <Icon name="add" />
      </van-button>
    </template>
    <template #main>
      <!-- <van-checkbox-group v-model="checked">
        <van-collapse v-model="collapseActiveName" accordion>
          <van-row
            v-for="(item, index) in list"
            :key="index"
            class="cell-group-margin"
          >
            <transition name="checkbox">
              <van-checkbox
                :name="item"
                :ref="(el) => (checkboxRefs[index] = el)"
                @click.stop
                class="expand-checkbox"
                v-if="showCheckbox"
              />
            </transition> -->
      <van-cell-group
        inset
        class="article-item"
        v-for="article in articleList"
        :key="article.id"
      >
        <ArticleListItem :article="article" @click="onEdit(article.postId)" />
      </van-cell-group>
      <!-- </van-row>
        </van-collapse>
      </van-checkbox-group> -->
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/page.vue'
import ArticleListItem from '@/components/article-list-item.vue'
import Icon from '@/components/icons/navbar.vue'
import { useArticle } from '@/utils/useArticle'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const { articleList, getArticleList } = useArticle()
// 多选
const showCheckbox = ref(false)

const onEdit = (id: string) => {
  router.push('/post?id=' + id)
}

const handleSync = () => {
  getArticleList()
  // 反馈：成功 / 失败
}
</script>

<style lang="scss" scoped>
.article-item {
  margin: $margin-items;
}

:deep().van-button--small {
  width: calc(var(--van-button-small-height) * 1.2);
  margin: 0.1rem;
}
</style>
