<template>
  <router-view />
</template>

<style lang="scss">
html {
  background: #000;
  position: relative;
  body {
    background: rgb(23, 190, 73);
    height: 100vh;
    #app {
      background: blue;
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
