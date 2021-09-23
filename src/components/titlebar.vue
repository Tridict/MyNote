<template>
  <div class="title">{{ title }}</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 1.25rem;
  color: $text-gray;
  font-weight: 700;
  padding: 1rem 0;
}
</style>
