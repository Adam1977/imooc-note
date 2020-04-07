<template>
  <div id="app">
    <span class="icon-back"></span>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // document.addEventListener('DOMContentLoaded', () => {
    //   console.log(123123)
    //   const html = document.querySelector('html')
    //   html.style.fontSize = window.innerWidth / 10 + 'px'
    // })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  console.log(123123)
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 20 ? 20 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
