<template>
  <div class="map__wrapper">
        <p>OSM MAP PAGE</p>
        1. 지도 렌더 타겟 div 선언
        <div class="map" ref="map"></div>
    </div>
</template>

<script>
import CustomMap from '@/utils/mapConfig.js';
export default {
  name: 'RenderMap',
  data() {
    return {
    };
  },  
  mounted() {
    this.olMap = new CustomMap(this.$refs.map);
  }
};
</script>
<style scoped>
.map__wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.map {
  width: 100%;
  height: 100%;
}
</style>