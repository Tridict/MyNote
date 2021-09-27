<template>
  <van-field type="file" @input="onInput" multiple />
  <van-uploader accept=".md, .txt" :after-read="onImportFiles" multiple>
    <van-cell>上传文件</van-cell>
  </van-uploader>
  <!-- <div class="row upload-box">
    <label>
      上传文件：
      <input type="file" @input="onInput" multiple />
    </label>
  </div> -->
  <div>{{ fileMetaList[0]?.content }}</div>
  <div class="droptarget-wrap">
    <div id="droptarget" ref="dropTarget">把文件拖到此处</div>
  </div>
</template>

<script setup lang="ts">
import useFile from '@/utils/useFile'
const { fileMetaList, onImportFiles } = useFile()

const onInput = (event: InputEvent) => {
  const target = event.target
  if (target instanceof HTMLInputElement && target.files) {
    onImportFiles(target.files)
  }
}
</script>

<style lang="scss" scoped>
.droptarget-wrap {
  display: flex;
  height: 30vh;
  width: var(--td-main-width);
  margin-top: var(--td-btn-padding-top);
  #droptarget {
    height: 80%;
    width: 100%;
    background: var(--td-gray-bg);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
