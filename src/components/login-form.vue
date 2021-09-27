<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="keys"
        name="keys"
        label="keys"
        placeholder="请输入LeanCloud Keys 字符串"
        :rules="[{ keysValidator: validatorMessage }]"
      />
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ regPassword, message: '请填写密码' }]"
      />
      <van-cell center title="记住keys">
        <template #right-icon>
          <van-switch v-model="rememberKeys" size="20" />
        </template>
      </van-cell>
      <van-cell center title="记住用户名">
        <template #right-icon>
          <van-switch v-model="rememberUsername" size="20" />
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
import { onMounted, ref } from 'vue'
import { Notify } from 'vant'
import store from '@/utils/stores'
import { useRouter } from 'vue-router'
const router = useRouter()

interface FormValues {
  keys: string
  username: string
  password: string
}

const keys = ref('')
const username = ref('')
const password = ref('')
const rememberKeys = ref(false)
const rememberUsername = ref(false)

// 正则校验密码（至少5位）
const regPassword = /.{5}.+/

// 校验函数返回 true 表示校验通过，false 表示不通过
const keysValidator = (val: string) => /1\d{10}/.test(val)

// 校验函数可以直接返回一段错误提示
const validatorMessage = () => `LeanCloud字符串可能不正确`

const onSubmit = (values: FormValues) => {
  console.log('submit', values)
  onLogin()
}

const onLogin = () => {
  rememberOptions()
  Notify({ type: 'success', message: `你好，${username.value}，登录成功啦！` })
  router.push('/notes')
}

const rememberOptions = () => {
  if (rememberKeys.value) {
    store.setLocal('keys', keys.value)
  } else {
    store.setLocal('keys', '')
  }
  if (rememberUsername.value) {
    store.setLocal('username', username.value)
  } else {
    store.setLocal('username', '')
  }
  store.setLocal('rememberKeys', rememberKeys.value)
  store.setLocal('rememberUsername', rememberUsername.value)
}

onMounted(() => {
  rememberKeys.value = store.get('rememberKeys') || false
  rememberUsername.value = store.get('rememberUsername') || false
  keys.value = store.get('keys') || ''
  username.value = store.get('username') || ''
})
</script>

<style lang="scss" scoped>
:deep().van-cell__title {
  text-align: left;
}

.btn-wrap {
  margin: $margin-items;
}
</style>
