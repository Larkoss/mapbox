// Create a mapbox-compatible deck.gl layer
const myDeckLayer = new MapboxLayer({
    id: 'my-scatterplot',
    type: ScatterplotLayer,
    data: [
      {position: [33.410593, 35.145551], size: 400}
    ],
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [200, 0, 0]
  });

  // Insert the layer before mapbox labels
  map.on('load', () => {
    map.addLayer(myDeckLayer, 'waterway-label');
  });