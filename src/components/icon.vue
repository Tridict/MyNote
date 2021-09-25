<template>
  <svg
    v-if="content == 'save'"
    width="1.3rem"
    height="1.3rem"
    viewBox="0 0 24 24"
  >
    <path
      d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4m2 16H5V5h11.17L19 7.83V19m-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3M6 6h9v4H6V6z"
      fill="currentColor"
    ></path>
  </svg>
  
</template>

<script setup>
import { defineProps } from 'vue'
defineProps<{
  content: string
}>()
</script>

<style>
.icon {
  box-sizing: content-box;
  width: 0.75em;
  height: 0.75em;
  padding: 0.25em 0.25em;
  color: var(--td-dark);
  border: 0;
  opacity: 0.5;
}

.btn-close {
  background: url('https://api.iconify.design/fa:close.svg') no-repeat center
    center / contain;
}
</style>
