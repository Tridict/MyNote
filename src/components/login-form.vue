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
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
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
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface FormValues {
  keys: string
  用户名: string
  密码: string
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
}
</script>

<style lang="scss" scoped>
:deep().van-cell__title {
  text-align: left;
}
</style>
