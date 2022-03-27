<template>
  <van-loading v-if="loading" size="16"/>
  <template v-else>
    <template v-if="name === 'back'">
      <svg
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        name="mdi-chevron-left"
      >
        <path
          d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template v-if="name === 'showMore'">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
        name="fa-solid:ellipsis-h"
      >
        <path
          d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72s32.2-72 72-72s72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72s72-32.2 72-72s-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72s72-32.2 72-72s-32.2-72-72-72z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template v-if="name === 'showPreview'">
      <svg
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        v-if="active"
        name="mdi-file-eye-outline"
      >
        <path
          d="M17 18c.56 0 1 .44 1 1s-.44 1-1 1s-1-.44-1-1s.44-1 1-1m0-3c-2.73 0-5.06 1.66-6 4c.94 2.34 3.27 4 6 4s5.06-1.66 6-4c-.94-2.34-3.27-4-6-4m0 6.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5a2.5 2.5 0 0 1 2.5 2.5a2.5 2.5 0 0 1-2.5 2.5M9.27 20H6V4h7v5h5v4.07c.7.08 1.36.25 2 .49V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.5a8.15 8.15 0 0 1-1.23-2z"
          fill="currentColor"
        ></path>
      </svg>
      <svg
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        v-else
        name="mdi-note-edit-outline"
      >
        <path
          d="M18.13 12l1.26-1.26c.44-.44 1-.68 1.61-.74V9l-6-6H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h6v-1.87l.13-.13H5V5h7v7h6.13M14 4.5l5.5 5.5H14V4.5m5.13 9.33l2.04 2.04L15.04 22H13v-2.04l6.13-6.13m3.72.36l-.98.98l-2.04-2.04l.98-.98c.19-.2.52-.2.72 0l1.32 1.32c.2.2.2.53 0 .72z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template v-if="name === 'save'">
      <!-- <svg
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        name="mdi-content-save-outline"
      >
        <path
          d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4m2 16H5V5h11.17L19 7.83V19m-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3M6 6h9v4H6V6z"
          fill="currentColor"
        ></path>
      </svg> -->
      <van-icon size="18" name="success" />
      <!-- <van-icon size="18" name="https://api.iconify.design/cil:save.svg" /> -->
    </template>
    <template v-if="name === 'sync'">
      <svg
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        name="mdi-cloud-sync-outline"
      >
        <path
          d="M19 12v1.5c2.21 0 4 1.79 4 4c0 .82-.25 1.58-.67 2.21l-1.09-1.09c.17-.34.26-.72.26-1.12A2.5 2.5 0 0 0 19 15v1.5l-2.25-2.25l-.03-.03c.06-.05.13-.09 2.28-2.22m0 11v-1.5c-2.21 0-4-1.79-4-4c0-.82.25-1.58.67-2.21l1.09 1.09c-.17.34-.26.72-.26 1.12A2.5 2.5 0 0 0 19 20v-1.5l2.25 2.25l.03.03c-.06.05-.13.09-2.28 2.22m-5.97-5H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.5 6 12 6c3 0 5.4 2.37 5.5 5.32c.62-.21 1.3-.32 2-.32c1.28 0 2.47.38 3.5 1c-.87-1.1-2.16-1.86-3.65-1.97A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.03A6.004 6.004 0 0 0 6 20h7.5c-.26-.62-.42-1.3-.47-2z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
    <template v-if="name === 'add'">
      <svg
        width="1.2rem"
        height="1.2rem"
        viewBox="0 0 24 24"
        name="ic-round-add"
      >
        <path
          d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
          fill="currentColor"
        ></path>
      </svg>
    </template>
  </template>
</template>

<script setup lang="ts">
// icons来源：https://icones.netlify.app/collection/all
import { defineProps } from 'vue'

defineProps<{
  name: 'back' | 'showMore' | 'showPreview' | 'save' | 'sync' | 'add'
  active?: boolean
  loading?: boolean
}>()
</script>
