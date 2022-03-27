<template>
  <div class="login-wrap">
    <div class="title">
      MyNote
      <div class="subtitle">我的专属备忘录</div>
    </div>
    <LoginForm />
    <footer>
      <div class="version">ver 0.0.3</div>
      <div class="sign">L❤️C</div>
      <a class="link">github</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/login-form.vue'
document.title="login - MyNote"
</script>

<style lang="scss" scoped>
.login-wrap {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
  .title {
    font-size: 20px;
    .subtitle {
      font-size: 12px;
    }
  }
  footer {
    font-size: 12px;
  }
}
</style>
