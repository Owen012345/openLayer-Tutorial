import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';

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

  addMarker(position, iconSrc) {
    console.log(position)
    const markerSource = new VectorSource();
    const markerGeometry = new Point(position);
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
