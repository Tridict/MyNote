<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="data.keys"
        name="keys"
        label="keys"
        placeholder="请输入LeanCloud Keys 字符串"
        :rules="[{ required: true, message: '请填写LeanCloud Keys' }]"
      />
      <van-field
        v-model="data.username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="data.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-cell center title="记住keys">
        <template #right-icon>
          <van-switch v-model="data.rememberKeys" size="20" />
        </template>
      </van-cell>
      <van-cell center title="记住用户名">
        <template #right-icon>
          <van-switch v-model="data.rememberUsername" size="20" />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="btn-wrap">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { Notify } from 'vant'
import store from '@/utils/stores'
import { useRouter } from 'vue-router'
import { initLc, login } from '@/api/lc'
const router = useRouter()

const status = reactive({
  username: '',
  isLcInitiated: false,
  isLoggedIn: false,
  isLoggingIn: false
})

const data = reactive({
  keys: '',
  username: '',
  password: '',
  rememberKeys: false,
  rememberUsername: false,
  leanCloudKeys: { appId: '', appKey: '', serverURL: '' }
})

// 校验函数返回 true 表示校验通过，false 表示不通过
const keysValidator = (val: string) => {
  const keyArray = val.trim().split(' ')
  if (keyArray.length != 3) {
    return false
  }
  data.leanCloudKeys = {
    appId: keyArray[0],
    appKey: keyArray[1],
    serverURL: keyArray[2]
  }
  return true
}

const onSubmit = () => {
  //表单验证
  if (keysValidator(data.keys)) {
    onLogin()
  } 
  // else {
  //   console.log(`LeanCloud字符串可能不正确`)
  // }
}

const onLogin = async () => {
  rememberValues()
  if (!status.isLcInitiated) {
    status.isLcInitiated = await initLc(data.leanCloudKeys)
    // Lc请求数据
    // if (!status.isLcInitiated) {
    //   console.log('fewfcaew')
    // }
  }
  try {
    await login({ username: data.username, password: data.password })
    Notify({
      type: 'success',
      message: `你好，${data.username}，登录成功啦！`
    })
    router.push('/notes')
  } catch (error) {
    console.log(error)
    Notify(`${error}`)
  }
}

const rememberValues = () => {
  if (data.rememberKeys) {
    store.setLocal('keys', data.keys)
  } else {
    store.setLocal('keys', '')
  }
  if (data.rememberUsername) {
    store.setLocal('username', data.username)
  } else {
    store.setLocal('username', '')
  }
  store.setLocal('rememberKeys', data.rememberKeys)
  store.setLocal('rememberUsername', data.rememberUsername)
}

const readValues = () => {
  data.rememberKeys = store.get('rememberKeys') || false
  data.rememberUsername = store.get('rememberUsername') || false
  data.keys = store.get('keys') || ''
  data.username = store.get('username') || ''
}

onMounted(readValues)
</script>

<style lang="scss" scoped>
:deep().van-cell__title {
  text-align: left;
}

.btn-wrap {
  margin: $margin-items;
}
</style>
