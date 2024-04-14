<template>
  <Header />
  <div class="app_main">
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/common/AppHeader.vue';

export default {
  name: "App",
  components: {
    Header
  }
}
</script>

<style scoped>
  .app_main {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
