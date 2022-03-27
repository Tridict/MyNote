<template>
  <van-swipe-cell>
    <slot></slot>
    <template #right>
      <!-- 分享 -->
      <!-- 移动 -->
      <!-- <van-button
        square
        type="primary"
        text="导出"
        class="swipe-btn"
        @click="onExport"
      /> -->
      <van-button
        square
        type="danger"
        text="删除"
        class="swipe-btn"
        @click="onDelete"
      />
    </template>
  </van-swipe-cell>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Dialog, Notify } from 'vant'
import { delNote } from '@/api/notes'
const props =
  defineProps<{ postId: string; getArticleList: () => Promise<void> }>()

// const onDelete = async () => {
//   await delNote(props.postId)
//   await props.getArticleList() // 刷新列表
//   Notify({ type: 'success', message: `操作成功：笔记已删除` })
// }

const onDelete = () => {
  // 确认删除的回调
  const deletingNote = (action: string): Promise<boolean> =>
    new Promise((resolve) => {
      if (action === 'confirm') {
        delNote(props.postId)
          .then(props.getArticleList)
          .then(() => {
            Notify({ type: 'success', message: `操作成功：笔记已删除` })
          })
          .catch((error) => {
            Notify(`删除失败：${error}`)
          })
          .finally(() => {
            resolve(true)
          })
      } else {
        // 拦截取消操作
        resolve(true)
      }
    })

  // 首先弹出窗口确认是否要删除
  Dialog.confirm({
    title: '文件删除后将无法恢复',
    // message: '文件删除后将无法恢复',
    confirmButtonText: '删除',
    beforeClose: deletingNote
  })
}
</script>

<style scoped>
.swipe-btn {
  height: 100%;
}
</style>
