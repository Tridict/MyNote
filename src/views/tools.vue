<template>
  <Page title="实用工具" current="tools">
    <template #main>
      <van-cell
        v-for="(tool, idx) in toolList"
        :key="idx"
        @click="onEdit(tool.action)"
      >
        <template #title>
          <div class="tool-title">{{ tool.title }}</div>
          <div class="tool-abstract">{{ tool.abstract }}</div>
        </template>
      </van-cell>
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/common/page.vue'
// import { Toast } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()

interface tool {
  title: string
  abstract: string
  action: string
}

const toolList: tool[] = [
  {
    title: '公众号文章收藏',
    abstract: '将微信公众号文章收藏到 LeanCloud 数据库。仅文字。',
    action: 'onImport'
  },
  {
    title: '自定义网站收藏',
    abstract: '将自定义网站文章收藏到 LeanCloud 数据库。仅文字。',
    action: 'onImport'
  },
  {
    title: '导出为 Markdown',
    abstract: '将选中的笔记导出为一个 Markdown 文件。',
    action: 'onExport'
  },
  {
    title: '从 Json 导入',
    abstract: '从以前导出的 Json 文件中导入笔记。',
    action: 'onImport'
  }
]

const onEdit = (action: string) => {
  console.log(action + '功能尚未实现，敬请期待')
  router.push('/tool-page')
}
</script>

<style lang="scss" scoped>
.tool-title {
  font-weight: 700;
  color: $text-black;
}
// .tool-abstract {
//   padding: 0.5rem 0;
// }
</style>
