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

class CustomMap {
  constructor(target, center = [126.9783882, 37.5666103], zoom = 15) {
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

  changeMapType(mapType) {
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

}

export default CustomMap;
