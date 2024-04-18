import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';

import OSM from 'ol/source/OSM';
import StadiaMaps from 'ol/source/StadiaMaps.js';

import { GeoJSON } from 'ol/format';


class CustomMap {
  constructor(target, center = [126.9783882, 37.5666103], zoom = 10) {
    this.map = new OlMap({
      target: target,
      layers: [
        new OlLayerTile({
          source: new OSM()
        })
      ],
      view: new OlView({
        center: fromLonLat(center),
        zoom: zoom
      })
    });
  }

  changeMapType(mapType, center, zoom) {
    let layer
    if (mapType === 'osm') {
      layer = new OlLayerTile({
        source: new OSM()
      });
    }
    else if(mapType === 'stamen') {
      const watercolorLayer = new OlLayerTile({
        source: new StadiaMaps({
          layer: 'stamen_watercolor'
        })
      });

      const terrainLayer = new OlLayerTile({
        source: new StadiaMaps({
          layer: 'stamen_terrain_labels'
        })
      });
      layer = [watercolorLayer, terrainLayer]
    }

    if(Array.isArray(layer)) {
      this.map.getLayers().setAt(0, layer[0]); /// mapType이 변경될떄 마다 기본 layer를 변경

      for(let i=1; i<layer.length; i++) {
        this.map.addLayer(layer[1]);
      }
    }
    else this.map.getLayers().setAt(0, layer); /// mapType이 변경될떄 마다 기본 layer를 변경
    
    this.map.getView().setCenter(fromLonLat(center));
    this.map.getView().setZoom(zoom);
  }

  addMarker(position, iconSrc) {
    const markerSource = new VectorSource();
    const markerGeometry = new Point(position); // position 은 latitue, longitude
    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: iconSrc
      })
    });
    const markerFeature = new Feature({
      geometry: markerGeometry
    });
    markerFeature.setStyle(markerStyle);
    const markerLayer = new VectorLayer({
      source: markerSource
    });
    markerSource.addFeature(markerFeature);

    this.map.addLayer(markerLayer);
  }

  showGeoJSON() {
    // GeoJSON 파일의 경로
    const geojsonUrl = '서울특별시.geojson';

    // GeoJSON 파일 로드
    fetch(geojsonUrl)
      .then(response => response.json())
      .then(data => {
        // GeoJSON 포맷 객체 생성
        const geojsonFormat = new GeoJSON();
        
        // GeoJSON 데이터를 파싱하여 Feature 객체 생성
        const features = geojsonFormat.readFeatures(data);

        // Vector Source 생성
        const vectorSource = new VectorSource({
          features: features
        });

        // Vector Layer 생성
        const vectorLayer = new VectorLayer({
          source: vectorSource
        });

        // 기존에 추가된 모든 레이어 제거
        this.map.getLayers().clear();

        // GeoJSON으로 생성된 Vector Layer 추가
        this.map.addLayer(vectorLayer);

        // 맵의 중심을 GeoJSON 데이터의 영역으로 이동
        const extent = vectorSource.getExtent(); // extent 범위는 [최소 경도, 최소 위도, 최대 경도, 최대 위도]로 구성된 배열
        console.log (extent)
        this.map.getView().fit(extent);
      })
      .catch(error => {
        console.error('Error loading GeoJSON:', error);
      });
  }

}

export default CustomMap;
