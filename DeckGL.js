
import {MapboxLayer} from '@deck.gl/mapbox';
import {ScatterplotLayer} from '@deck.gl/layers';
import mapboxgl from 'mapbox-gl';

const myDeckLayer = new MapboxLayer({
  id: 'my-scatterplot',
  type: ScatterplotLayer,
  data: [
    {position: [33.410593, 35.145551], size: 100000000}
  ],
  getPosition: d => d.position,
  getRadius: d => d.size,
  getColor: [0, 255, 0]
});

map.on('load', () => {
    map.addLayer(myDeckLayer);
  });