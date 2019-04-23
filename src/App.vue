<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,html {
  background: #f5f6fa;
}
#app {
  max-width: 100%;
  min-height: 100%;
  overflow: hidden;
}
</style>
