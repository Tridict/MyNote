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
      <van-button size="mini" @click="showCheckbox = !showCheckbox">
        <van-icon
          size="20"
          name="https://api.iconify.design/fa-solid:ellipsis-h.svg"
        />
      </van-button>
      <van-button size="mini" to="/post">
        <van-icon
          size="20"
          name="https://api.iconify.design/ic:round-add.svg"
        />
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
            <van-cell-group
              inset
              class="article-item"
              v-for="article in articleList"
              :key="article.id"
            >
              <ArticleListItem :article="article" @click="onEdit(article.id)" />
            </van-cell-group>
          <!-- </van-row>
        </van-collapse>
      </van-checkbox-group> -->
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/page.vue'
import ArticleListItem from '@/components/article-list-item.vue'
import { articleList } from '@/utils/useArticle'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
// 多选
const showCheckbox = ref(false)

const onEdit = (id: number) => {
  router.push('/post?id=' + id)
}
</script>

<style lang="scss" scoped>
.article-item {
  margin: $margin-items;
}
</style>
