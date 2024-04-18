<template>
  <div class="map__wrapper">
        <p>OSM MAP PAGE</p>
        <div style="display: flex; gap: 20px">
          <p>1. 지도 렌더 테스트</p>
          <select style="width: 100px" v-model="mapSelected" @change="mapTypeHandler">
            <option v-for="(map, i) in mapType" :key="i" :value="map.value" >{{ map.name }}</option>
          </select>
          <p>{{getTypeOfSource}} Type</p>
        </div>
        <div class="map" ref="map"></div>
    </div>
</template>

<script>
import CustomMap from '@/utils/mapConfig.js';
export default {
  name: 'RenderMap',
  data() {
    return {
      map : null,
      mapSelected: 'osm',
      mapType : [
        {name: 'OSM', value: 'osm'},
        {name: 'Stamen', value: 'stamen'},
        {name: 'Vector Test', value: 'vector'}
      ]
    };
  },
  computed: {
    getTypeOfSource() {
      return ['osm', 'stamen'].indexOf(this.mapSelected) > -1 ? 'Tile' : 'Vector';
    }
  },
  methods: {
    mapTypeHandler() {
      if(this.mapSelected === 'vector') {
        this.map.showGeoJSON();
      }
      else {
        this.map.changeMapType(this.mapSelected, [126.9783882, 37.5666103], 10);
      }
    }
  },
  mounted() {
    this.map = new CustomMap(this.$refs.map);
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