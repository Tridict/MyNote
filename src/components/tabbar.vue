<template>
  <van-tabbar route>
    <van-tabbar-item
      replace
      :to="name"
      :class="{ 'van-tabbar-item--active': props.current === name }"
      v-for="(name, idx) in tabs"
      :key="name"
      :badge="msgs[idx]"
    >
      <span>{{ name }}</span>
      <template #icon>
        <Icon :name="name" :active="props.current === name" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import Icon from '@/components/icons/tabbar-icon.vue'

const props = defineProps<{
  current: string
}>()
const msgs = ref(['', '', ''])
const tabs = ref(['notes', 'tools', 'me'])
</script>

<style></style>
