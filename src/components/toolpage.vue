<template>
  <div class="tool-page">
    <van-nav-bar :title="title">
      <template #left>
        <van-button size="small" @click="onBack">
          <van-icon
            size="20"
            name="https://api.iconify.design/mdi:chevron-left.svg"
          />
        </van-button>
      </template>
      <template #right>
        <van-button size="small" @click="showMore = true">
          <van-icon
            size="16"
            name="https://api.iconify.design/fa-solid:ellipsis-h.svg"
          />
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 主要部分 -->
    <div class="content-wrap">
      <!-- <slot name="label" /> -->
      <!-- {{ label }} -->
      将微信公众号文章收藏到 LeanCloud 数据库。仅文字。
    </div>
    <van-cell-group inset>
      <van-field label="url" placeholder="请填写微信公众号文章url"></van-field>
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="primary" block round>分析</van-button>
    </div>

    <van-action-sheet
      v-model:show="showMore"
      :actions="options"
      cancel-text="取消"
      close-on-click-action
      safe-area-inset-bottom
    />
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEditorOptions } from '@/utils/useActionSheet'

const title = '公众号文章收藏'
const router = useRouter()
const { showMore, options } = useEditorOptions()

const onBack = () => {
  // 判断是否保存草稿
  router.push('/tools')
  // notes更新数据
}
</script>

<style lang="scss" scoped>
.content-wrap {
  color: $text-gray;
}
.content-wrap,
.btn-wrap {
  margin: 16px;
  font-size: var(--van-button-normal-font-size);
}
</style>
