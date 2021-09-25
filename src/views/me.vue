<template>
  <Page :title="username" current="me">
    <template #main>
      <van-cell-group title="深色模式">
        <van-field center label="跟随系统">
          <template #right-icon>
            <van-switch v-model="isAutoDark" size="20" />
          </template>
        </van-field>
        <van-field center label="手动开启" :disabled="isAutoDark">
          <template #right-icon>
            <van-switch v-model="isDark" size="20" :disabled="isAutoDark" />
          </template>
        </van-field>
      </van-cell-group>
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/page.vue'
import { ref } from '@vue/reactivity'

const username = 'cora'
const isAutoDark = ref(false)
const isDark = ref(false)
</script>
