<template>
  <div class="map__wrapper">
        <p>OSM MAP PAGE</p>
        2. 지도 마커 테스트
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
    this.map = new CustomMap(this.$refs.map);
    this.map.addMarker([126.9783882, 37.5666103], 'https://openlayers.org/en/latest/examples/data/icon.png')
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