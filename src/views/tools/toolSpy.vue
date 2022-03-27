<template>
  <div class="tool-page">
    <van-nav-bar :title="title">
      <template #left>
        <van-button size="small" @click="onBack">
          <Icon name="back" />
        </van-button>
      </template>
      <template #right>
        <van-button size="small">
          <Icon name="showMore" />
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 主要部分 -->
    <div class="content-wrap">
      将微信公众号文章收藏到 LeanCloud 数据库。仅文字。
    </div>
    <van-cell-group inset>
      <van-field
        label="url"
        placeholder="请填写微信公众号文章url"
        v-model="url"
      ></van-field>
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="primary" block round @click="handleAnalyze">
        <van-loading v-if="status.isAnalyzing" size="20" />
        <span v-else>分析</span>
      </van-button>
    </div>
    <div class="content-wrap spy-result">
      {{ resultInfos }}
    </div>
    <div class="btn-wrap" v-if="resultInfos">
      <van-button type="primary" block round @click="saveAsNote">
        保存到笔记
      </van-button>
    </div>

    <!-- <van-action-sheet
      v-model:show="showMore"
      :actions="options"
      cancel-text="取消"
      close-on-click-action
      safe-area-inset-bottom
    /> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'vant'
// import { useEditorOptions } from '@/utils/useActionSheet'
import { createNote } from '@/api/notes'
import { spy, spyJuejin } from '@/api/spy'
import { getQueryParams } from '@/utils/urlQuery'
import Icon from '@/components/icons/navbar-icon.vue'

const status = reactive({
  isAnalyzing: false
})
const title = '公众号文章收藏'
const url = ref('')
const resultInfos = ref('')
const router = useRouter()
// const { showMore, options } = useEditorOptions()

const onBack = () => {
  // 判断是否保存草稿
  router.push('/tools')
  // notes更新数据
}

const handleAnalyze = async () => {
  status.isAnalyzing = true
  try {
    const mode = getQueryParams('mode')
    let result
    if (mode && mode == 'j') {
      result = await spyJuejin(url.value)
    } else {
      result = await spy(url.value)
    }
    console.log(result)
    let resultTable = '```yaml\nurl: "' + url.value + '"'
    if (typeof result.result === 'object' && result.result != null) {
      for (const key in result.result) {
        const meta = result.result[key]
        if (meta && meta.length) {
          for (const i in meta) {
            if (meta[i]?.meta_key == 'title') {
              resultTable = `# [${meta[i]?.meta_value}](${url.value})\n\n${resultTable}`
            } else {
              resultTable += `\n${meta[i]?.meta_key}: ${JSON.stringify(
                meta[i]?.meta_value
              )}`
            }
          }
        }
      }
    }
    resultInfos.value = resultTable + '\n```'
  } catch (error) {
    console.log(error)
  }
  status.isAnalyzing = false
}

const saveAsNote = async () => {
  try {
    await createNote(resultInfos.value)
    Notify({ type: 'success', message: '公众号内容已保存到笔记列表' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="scss" scoped>
.content-wrap {
  color: $text-gray;
}
.content-wrap,
.btn-wrap {
  margin: $margin-items;
  font-size: var(--van-button-normal-font-size);
}

.spy-result {
  white-space: pre-wrap;
}
</style>
