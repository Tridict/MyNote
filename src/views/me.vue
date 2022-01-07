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
      <van-button class="btn" block to="/login" @click="logOut">
        退出登录
      </van-button>
    </template>
  </Page>
</template>

<script setup lang="ts">
import Page from '@/components/common/page.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import store from '@/utils/stores'

const username = ref('')
const isAutoDark = ref(false)
const isDark = ref(false)

const setUsername = () => {
  username.value = store.get('LcUserInfo')?.username || ''
}

const logOut = () => {
  store.removeLocal('LcUserInfo')
  store.removeLocal('leanCloundKeys')
}

onMounted(setUsername)
</script>

<style lang="scss" scoped>
.btn {
  margin: $margin-items 0;
  border: 0;
}
</style>
