<template>
  <div class="map__wrapper">
    <p>OSM MAP PAGE</p>
    <p>2. 지도 마커 테스트</p>
    <div class="map-position">{{ mousePosition }}</div>
    <div class="map" ref="map"></div>
  </div>
</template>

<script>
import CustomMap from '@/utils/mapConfig'; // 경로 수정
import { toStringXY } from 'ol/coordinate'; // OpenLayers의 좌표 변환 함수를 불러옵니다.
export default {
  name: 'MapMarker',
  data() {
    return {
      mousePosition: []
    };
  },
  mounted() {
    this.map = new CustomMap(this.$refs.map);

    // 좌표를 이용한 마커 추가
    this.map.addMarker([126.9783882, 37.5666103], 'https://openlayers.org/en/latest/examples/data/icon.png');

    // 마우스 이동 이벤트 리스너 추가
    this.$refs.map.addEventListener('mousemove', this.handleMouseMove);
    this.$refs.map.addEventListener('mouseout', () => {
      this.mousePosition = [];
    });
    this.$refs.map.addEventListener('click', () => {
        this.map.addMarker(this.mousePosition, 'https://openlayers.org/en/latest/examples/data/icon.png');
    });
  },
  methods: {
    handleMouseMove(event) {
        const mapElementRect = this.$refs.map.getBoundingClientRect();
        // 지도 엘리먼트 내에서의 마우스 위치를 계산합니다.
        const offsetX = event.clientX - mapElementRect.left;
        const offsetY = event.clientY - mapElementRect.top;
        // 마우스의 화면 좌표를 가져옵니다.
        const pixel = [offsetX, offsetY];
        // 화면 좌표를 지도 좌표로 변환합니다.
        const coordinate = this.map.map.getCoordinateFromPixel(pixel); // map 속성을 사용하여 지도 객체에 접근합니다.
        // 변환된 좌표를 문자열로 표현하여 저장합니다.
        this.mousePosition = toStringXY(coordinate, 2).split(',').map(parseFloat);
    }
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
