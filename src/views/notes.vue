<template>
  <Page title="MyNote" current="notes">
    <template #title-left>
      <van-button size="small" @click="handleSync">
        <Icon name="sync" :loading="status.isSyncing" />
      </van-button>
    </template>
    <template #title-right>
      <van-button
        size="small"
        @click="status.showCheckbox = !status.showCheckbox"
      >
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
      <template v-if="articleList?.length">
        <!-- 置顶文章 -->
        <div class="pinned-wrap van-hairline--surround">
          <div class="van-cell-group__title">置顶</div>
          <van-cell-group
            inset
            class="article-item"
            v-for="article in pinnedArticleList"
            :key="article.id"
          >
            <ArticleListItem
              :article="article"
              @click="onEdit(article.postId)"
            />
          </van-cell-group>
        </div>
        <!-- 其他文章 -->
        <van-cell-group
          inset
          class="article-item"
          v-for="article in articleList"
          :key="article.id"
        >
          <ArticleListItem :article="article" @click="onEdit(article.postId)" />
        </van-cell-group>
      </template>
      <van-cell-group inset class="article-item article-item__skeleton" v-else>
        <van-skeleton title :row="4" />
      </van-cell-group>
      <!-- </van-row>
        </van-collapse>
      </van-checkbox-group> -->
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/common/page.vue'
import ArticleListItem from '@/components/article-list-item.vue'
import Icon from '@/components/common/icons/navbar-icon.vue'
import { useArticle } from '@/utils/notes/useArticle'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { Notify } from 'vant'
const router = useRouter()
const { articleList, pinnedArticleList, getArticleList } = useArticle()
// 多选
const status = reactive({
  isSyncing: false,
  showCheckbox: false
})

const onEdit = (id: string) => {
  router.push('/post?id=' + id)
}

const handleSync = async () => {
  status.isSyncing = true
  try {
    await getArticleList()
    Notify({ type: 'success', message: '笔记清单同步成功！' })
  } catch (error) {
    Notify('笔记清单同步失败')
  }
  status.isSyncing = false
}
</script>

<style lang="scss" scoped>
.article-item {
  margin: $margin-items;
  &__skeleton {
    padding: $margin-items;
  }
}

.pinned-wrap {
  padding-bottom: $margin-items;
  background: #eee;
  .article-item {
    margin-top: 0;
  }
}

:deep().van-button--small {
  width: calc(var(--van-button-small-height) * 1.2);
  margin: 0.1rem;
}
</style>
