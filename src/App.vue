<template>
  <Generator />

</template>

<script>
import Generator from './components/MedcineList.vue'

export default {
  name: 'App',
  components: {
    Generator
  }
}
</script>

<style lang="scss">
html, body {
  margin: 20px 10px;
  height: 100%;
  background: #F9F9F9;
}
.container {
  padding-top: 20px;
}
</style>