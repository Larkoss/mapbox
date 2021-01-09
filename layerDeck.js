// Create a mapbox-compatible deck.gl layer
const layerDeck = new MapboxLayer({
    id: 'my-scatterplot',
    type: ScatterplotLayer,
    data: [
      {position: [33.410593, 35.145551], size: 400}
    ],
    getPosition: d => d.position,
    getRadius: d => d.size,
    getColor: [238, 244, 241]
  });