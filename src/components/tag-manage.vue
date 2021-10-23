<template>
  <van-action-sheet v-model:show="show" title="添加标签">
    <van-cell-group inset>
      <van-field class="current-tags-wrap">
        <template #input>
          <ArticleTag :tags="tagList" />
          <input
            v-model="tagFilterValue"
            type="text"
            class="van-field__control"
            placeholder="选择或搜索标签"
          />
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group inset title="全部标签">
      <div class="all-tags-wrap">
        <span @click="handleSelectTag">
          <ArticleTag :tags="allTagList" color="gray" />
        </span>
        <van-tag plain @click="showPopInput = true">+新建标签</van-tag>
      </div>
    </van-cell-group>
  </van-action-sheet>
  <van-popup class="new-tag-wrap" v-model:show="showPopInput" round>
    <van-cell value="新建标签" />
    <van-cell-group inset>
      <van-field v-model="newTagName" placeholder="标签名称" />
      <van-button type="primary" :disabled="!newTagName" @click="handleAddTag">
        完成
      </van-button>
    </van-cell-group>
  </van-popup>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useTag } from '@/utils/notes/useTag'
import ArticleTag from '@/components/common/article-tag.vue'
const props = defineProps<{ isShow: boolean; postId: string }>()
const show = ref(props.isShow)
const tagFilterValue = ref('') // 暂时无法搜索tag

watch(
  () => props.isShow,
  () => {
    show.value = props.isShow
  }
)

const {
  tagList,
  allTagList,
  showPopInput,
  newTagName,
  handleSelectTag,
  handleAddTag
} = useTag(props.postId)
</script>

<style lang="scss" scoped>
.current-tags-wrap {
  background: $bg;
  :deep().van-field__control--custom {
    flex-wrap: wrap;
    .article-tag {
      margin-bottom: 3px;
    }
  }
}
.all-tags-wrap {
  padding: 0 $margin-items $margin-items * 2;
}

.new-tag-wrap {
  padding: $margin-items;
}
</style>
