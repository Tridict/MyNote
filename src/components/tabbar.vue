<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="notes" :badge="notesMsg">
      <span>notes</span>
      <template #icon="props">
        <Icon name="notes" :active="props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="tools">
      <span>tools</span>
      <template #icon="props">
        <Icon name="tools" :active="props.active" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="me">
      <span>me</span>
      <template #icon="props">
        <Icon name="me" :active="props.active" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/icons/tabbar.vue'

const router = useRouter()
const props = defineProps<{
  current: string
}>()
const active = ref(props.current)
const notesMsg = ref('')

watch(active, () => {
  router.push('/' + active.value)
})
</script>

<style></style>
