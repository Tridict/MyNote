<template>
  <Page title="MyNote" current="notes">
    <template #title-left>
      <van-button size="mini">
        <van-icon
          size="18"
          name="https://api.iconify.design/mdi:cloud-sync-outline.svg"
        />
      </van-button>
    </template>
    <template #title-right>
      <van-button size="mini" to="/post">
        <van-icon
          size="18"
          name="https://api.iconify.design/ic:round-add.svg"
        />
      </van-button>
    </template>
    <template #main>
      <van-cell-group
        inset
        class="article-item"
        v-for="(article, idx) in articleList"
        :key="idx"
      >
        <van-cell :label="article.time" @click="onEdit(article.id)">
          <template #title>
            <div class="article-title van-ellipsis">{{ article.title }}</div>
            <van-tag
              class="article-tag"
              v-for="(tag, idx) in article.tags"
              :key="idx"
              color="#7232dd"
            >
              {{ tag }}
            </van-tag>
            <div class="van-multi-ellipsis--l3">
              {{ article.abstract }}
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/page.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

interface article {
  title: string
  abstract: string
  time: string
  id: number
  tags?: string[]
}

const articleList: article[] = [
  {
    title: '原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let 飞机都是减肥i哦饿减肥i饿哦减肥晚饭急哦饿我就哦饭；饿减肥i额外加',
    time: '2021-5-9 21:24',
    id: 0,
    tags: ['前端', 'JS', '笔记']
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 0
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值以及凑字数分为i哦饭居委的',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 0
  },
  {
    title: 'todos',
    abstract: '深色模式；（接入LeanCloud）登录、保存笔记；根据笔记id的路由',
    time: '2021-5-9 21:24',
    id: 0
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 0
  },
  {
    title: '【前端】【笔记】【JS】原始值与引用值',
    abstract:
      '6种数据类型（原始值/原始类型） - Undefined、Null、Boolean、Number、String、Symbol （访问：by value—按值） > 例如： > let a...',
    time: '2021-5-9 21:24',
    id: 0
  }
]

const onEdit = (id: number) => {
  router.push('/post?id=' + id)
}
</script>

<style lang="scss" scoped>
.article-item {
  margin: $margin-items;
  .article-title {
    font-weight: 700;
    color: $text-black;
  }
  .article-tag {
    margin-right: 10px;
  }
}

:deep().van-cell__title {
  max-width: 100%;
}
</style>
