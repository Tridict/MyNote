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
      <van-cell-group inset v-if="loading" class="article-item__skeleton">
        <van-skeleton title :row="4" />
      </van-cell-group>
      <template v-else>
        <!-- 文章列表 -->
        <template v-if="articleList?.length || pinnedArticleList?.length">
          <!-- 置顶文章 -->
          <div class="pinned-wrap van-hairline--surround">
            <div class="van-cell-group__title">置顶</div>
            <ArticleList
              :articleList="pinnedArticleList"
              :showCheckbox="status.showCheckbox"
              :getArticleList="getArticleList"
            />
          </div>
          <!-- 其他文章 -->
          <ArticleList
            :articleList="articleList"
            :showCheckbox="status.showCheckbox"
            :getArticleList="getArticleList"
          />
        </template>
        <!-- 空状态 -->
        <van-empty v-else description="暂无笔记">
          <van-button round type="primary" class="bottom-button" to="/post">
            新增笔记
          </van-button>
        </van-empty>
      </template>
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/common/page.vue'
import ArticleList from '@/components/article-list.vue'
import Icon from '@/components/common/icons/navbar-icon.vue'
import { useArticle } from '@/utils/notes/useArticle'
import { reactive, ref } from 'vue'
import { Notify } from 'vant'

const { loading, articleList, pinnedArticleList, getArticleList } = useArticle()
// 多选
const status = reactive({
  isSyncing: false,
  showCheckbox: false
})

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
.article-item__skeleton {
  margin: $margin-items;
  padding: $margin-items;
}

.pinned-wrap {
  padding-bottom: 1px;
  background: #eee;
  margin-bottom: $margin-items;
}

:deep().van-button--small {
  width: calc(var(--van-button-small-height) * 1.2);
  margin: 0.1rem;
}
</style>
