map.on('load', function () {
    map.addSource('buildings-data', {
        type: 'geojson',
        data: './buildings_nicosia_demo.json',
        //buffer: 0,
        //tolerance: 0.75
    });
});
const layerBuildings = {
    'id': 'buildings-data',
    'type': 'fill',
    'source': 'buildings-data',
    'layout': {
        //'icon-allow-overlap': true
    },
    'paint': {
        'fill-outline-color': '#3c997b',
        'fill-color': '#3cf0b7',
        'fill-opacity': 0.5
    }
};

const layerBuildingsHighlighted = {
    'id': 'buildings-data-highlighted',
    'type': 'fill',
    'source': 'buildings-data',
    'layout': {
        //'icon-allow-overlap': true
    },
    'paint': {
        'fill-outline-color': '#3c997b',
        'fill-color': '#eb3434',
        'fill-opacity': 0.75
    },
    'filter': ['in', 'objectid', '']
};

