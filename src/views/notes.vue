<template>
  <div class="notes-wrap">
    <Titlebar title="MyNote" />
    <main>
      <van-cell
        :label="article.time"
        v-for="(article, idx) in articleList"
        :key="idx"
        @click="onEdit(article.id)"
      >
        <template #title>
          <div class="article-title">{{ article.title }}</div>
          <div class="article-abstract">{{ article.abstract }}</div>
        </template>
      </van-cell>
    </main>
    <Tabbar current="notes" />
  </div>
</template>

<script setup lang="ts">
import Tabbar from '@/components/tabbar.vue'
import Titlebar from '@/components/titlebar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

interface article {
  title: string
  abstract: string
  time: string
  id: number
}

const articleList: article[] = [
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
  console.log('编辑文章页面' + id)
  router.push('/editor')
}
</script>

<style lang="scss" scoped>
.notes-wrap {
  height: calc(100vh - 3.125rem);
  display: flex;
  flex-direction: column;
  main {
    overflow: auto;
    flex: 1;
    .article-title {
      font-weight: 700;
      color: $text-black;
    }
    .article-abstract {
      padding: 0.5rem 0;
    }
  }
}
</style>
