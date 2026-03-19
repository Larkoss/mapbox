map.on('load', function () {
    map.addSource('roads', {
        type: 'geojson',
        data: './roads_nicosia_demo.json',
        //buffer: 0,
        //tolerance: 3.5
    });
});
const layerRoads = {
    'id': 'roads',
    'type': 'line',
    'source': 'roads',
    'layout': {
        //'icon-allow-overlap': true
    },
    'paint': {
        'line-color': '#ff69b4',
        'line-width': 1
    }
};

const layerRoadsHighlighted = {
    'id': 'roads-highligted',
    'type': 'line',
    'source': 'roads',
    'layout': {
        //'icon-allow-overlap': true
    },
    'paint': {
        'line-color': '#ae1ed6',
        'line-width': 3
    },
    'filter': ['in', 'id', '']
};

