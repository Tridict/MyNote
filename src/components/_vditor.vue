<template>
  <div id="vditor"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Vditor from 'vditor'

const vditor = ref<null | Vditor>(null)

onMounted(() => {
  initVditor()
})

const initVditor = () => {
  vditor.value = new Vditor('vditor', {
    height: 360,
    toolbarConfig: {
      pin: true
    },
    cache: {
      enable: false
    },
    after: () => {
      if (vditor.value) vditor.value.setValue('hello, Vditor + Vue!')
    }
  })
}
</script>

<style>
/* @import url(vditor/dist/index.css); */
</style>
