<template>
    <div class="map_Eric">
        <p>ERIC MAP PAGE</p>
        <p>3. 에릭 실습 테스트</p>
        <div id="map" class="map_Eric">{{ map }}</div>
    </div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Circle, Fill, Stroke, Style} from 'ol/style';

export default {
  name: 'MapEric',
  data() {
    return {
      map: null
    };
  },
  mounted() {
    // 맵 좌표 상의 초록색 점을 올리는 벡터 소스 생성
    const vectorSource = new VectorSource(
      {
        features: [
          new Feature({
            geometry: new Point([126.98, 37.54]) // [0, 0]은 맵 상의 좌표로, 각각 x, y 좌표를 의미, x와 y 값의 범위는 -180 ~ 180, -90 ~ 90
          }),
          new Feature({
            geometry: new Point([15, 25])
          }),
          new Feature({
            geometry: new Point([65, -5])
          }),
          new Feature({
            geometry: new Point([7, -24])
          })
        ]
      }
    );

    // 맵 좌표 상의 초록색 점을 올리는 벡터 레이어 생성
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: 'green'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 2
          })
        })
      })
    });

    // 타일 레이어 생성
    const tileLayer = new TileLayer({
      source: new OSM() // 타일 소스 생성
    });

    // 맵 객체 생성
    this.map = new Map({
      target: 'map',
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: [127.18, 37.62],
        zoom: 10,
        projection: 'EPSG:4326' // 벡터 레이어의 좌표계가 EPSG:4326이므로, 이를 설정해 맞추어야 함
      })
    });
  }
};

</script>

<style scoped>
.map_Eric {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>