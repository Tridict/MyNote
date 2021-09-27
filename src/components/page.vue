<template>
  <div class="page-wrap">
    <van-nav-bar :title="title">
      <template #left>
        <slot name="title-left" />
      </template>
      <template #right>
        <slot name="title-right" />
      </template>
    </van-nav-bar>
    <main>
      <slot name="main" />
    </main>
    <Tabbar :current="current" />
  </div>
</template>

<script setup lang="ts">
import Tabbar from '@/components/tabbar.vue'
import { defineProps } from 'vue'
defineProps<{
  title: string
  current: string
}>()
</script>

<style lang="scss" scoped>
$tab-bar-height: 3.125rem;

.page-wrap {
  height: calc(100vh - $tab-bar-height);
  display: flex;
  flex-direction: column;
  main {
    overflow: auto;
    flex: 1;
    background-color: $bg;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */

    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
