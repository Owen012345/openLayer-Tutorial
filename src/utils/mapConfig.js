import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlLayerTile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

function createCustomMap(target, center = [126.9783882, 37.5666103], zoom = 15) {
  const map = new OlMap({
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

  return map;
}

export default createCustomMap;
