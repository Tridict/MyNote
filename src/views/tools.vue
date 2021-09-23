<template>
  <div class="notes-wrap">
    <Titlebar title="实用工具" />
    <main>
      <van-cell
        title="公众号文章收藏"
        size="large"
        label="将微信公众号文章收藏到 LeanCloud 数据库。仅文字。"
        @click="onImport"
      />
      <van-cell
        title="自定义网站收藏"
        size="large"
        label="将自定义网站文章收藏到 LeanCloud 数据库。仅文字。"
      />
      <van-cell
        title="导出为 Markdown"
        size="large"
        label="将选中的笔记导出为一个 Markdown 文件。"
      />
      <van-cell
        title="从 Json 导入"
        size="large"
        label="从以前导出的 Json 文件中导入笔记。"
      />
    </main>
    <Tabbar current="tools" />
  </div>
</template>

<script setup lang="ts">
import Tabbar from '@/components/tabbar.vue'
import Titlebar from '@/components/titlebar.vue'
import { Toast } from 'vant'

const onImport = () => {
  Toast('该功能尚未实现，敬请期待')
}
</script>

<style lang="scss" scoped>
.notes-wrap {
  height: 100vh;
}
</style>
