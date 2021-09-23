<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="notes" badge="3">
      <span>notes</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="tools" icon="search">tools</van-tabbar-item>
    <van-tabbar-item name="me" icon="user-o">me</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  current: string
}>()
const active = ref(props.current)
const icon = {
  active: 'https://img.yzcdn.cn/vant/user-active.png',
  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
}
const router = useRouter()

watch(active, () => {
  router.push('/' + active.value)
})
</script>

<style></style>
