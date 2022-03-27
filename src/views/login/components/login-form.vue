<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="data.keys"
        name="keys"
        label="keys"
        placeholder="请输入LeanCloud Keys 字符串（选填）"
        :rules="[{ required: false, message: '请填写LeanCloud Keys' }]"
      />
      <van-field
        v-model="data.username"
        name="username"
        label="用户名"
        placeholder="请输入用户名*"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="data.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码*"
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
        <van-loading v-if="status.isLoggingIn"/>
        <span v-else>提交</span>
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'vant'
import store from '@/utils/stores'
import { getQueryParams } from '@/utils/urlQuery'
import { signUp, login } from '@/api/user'
const router = useRouter()

const status = reactive({
  isLoggingIn: false
})

const data = reactive({
  keys: '',
  username: '',
  password: '',
  rememberKeys: false,
  rememberUsername: false,
  leanCloudKeys: { appId: '', key: '', BASE_URL: '' }
})

// 校验函数返回 true 表示校验通过，false 表示不通过
const keysValidator = (val: string) => {
  const keyArray = val.trim().split(' ')
  if (keyArray.length != 3) {
    return false
  }
  data.leanCloudKeys = {
    appId: keyArray[0],
    key: keyArray[1],
    BASE_URL: keyArray[2]
  }
  store.setLocal('leanCloudKeys', data.leanCloudKeys)
  return true
}

const onSubmit = () => {
  //表单验证
  if (data.keys && !keysValidator(data.keys)) {
    console.log(`LeanCloud字符串可能不正确`)
  }
  else {
    onLogin()
  }
}

const onLogin = async (mode = '登录') => {
  status.isLoggingIn = true
  rememberValues()
  try {
    let userinfo = {}
    if (mode === '注册') {
      userinfo = await signUp({
        username: data.username,
        password: data.password
      })
    } else {
      userinfo = await login({
        username: data.username,
        password: data.password
      })
    }
    store.setLocal('LcUserInfo', userinfo)
    Notify({
      type: 'success',
      message: `你好，${data.username}，${mode}成功啦！`
    })
    const redirect = getQueryParams('redirect')
    if (typeof redirect === 'string') {
      router.push(redirect)
    } else {
      router.push('/notes')
    }
  } catch (error) {
    console.log(error)
    Notify(`${error}`)
  }
  status.isLoggingIn = false
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
