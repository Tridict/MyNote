<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.fade-enter-active {
  transition: all 0.4s ease-out;
}
.fade-leave-active {
  z-index: 1;
  // transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active {
  z-index: 1;
  transition: all 0.4s ease-out;
}
.slide-left-leave-active {
  // transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.4s ease-out;
}

// 左滑时，进入的元素从右边来
.slide-left-enter-from {
  transform: translateX(100vw);
  opacity: 0;
}

// 左滑时，离开的元素跑到左边
.slide-left-leave-to {
  transform: translateX(-100vw);
  opacity: 0;
}

// 暂时没用上。。。
// .slide-right-enter-active {
//   z-index: 1;
//   transition: all 0.4s ease-out;
// }
// .slide-right-leave-active {
//   // transition: all 0.7s cubic-bezier(1, 0.5, 0.8, 1);
//   transition: all 0.4s ease-out;
// }

// .slide-right-enter-from {
//   transform: translateX(-100vw);
//   opacity: 0;
// }

// .slide-right-leave-to {
//   transform: translateX(100vw);
//   opacity: 0;
// }
</style>

<style lang="scss">
html {
  background: rgb(219, 43, 43);
  position: relative;
  body {
    background: $bg;
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
