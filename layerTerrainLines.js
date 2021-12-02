map.on('load', function () {
    map.addSource('mapbox-terrain', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-terrain-v2'
    });
});

const layerTerrainLines = {
    'id': 'terrain-data',
    'type': 'line',
    'source': 'mapbox-terrain',
    'source-layer': 'contour',
    'layout': {
        'line-join': 'round',
        'line-cap': 'round'
    },
    'paint': {
        'line-color': '#4980e6',
        'line-width': 1
    }
};
