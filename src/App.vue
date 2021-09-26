<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
// .slide-left-enter-active,
// .slide-right-enter-active {
//   transition: all 1s ease-out;
// }

// .slide-left-enter-from,
// .slide-right-leave-to {
//   transform: translateX(100vw);
//   opacity: 0;
// }

// // 正常
// .slide-right-leave-from,
// .slide-left-leave-from,
// .slide-left-enter-to,
// .slide-right-enter-to {
//   opacity: 1;
// }

// .slide-left-leave-to,
// .slide-right-enter-from {
//   transform: translateX(-100vw);
//   opacity: 0;
// }
</style>

<style lang="scss">
html {
  background: #000;
  position: relative;
  body {
    background: rgb(23, 190, 73);
    #app {
      height: 100vh;
      background: $bg;
    }
  }
  body,
  #app {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
