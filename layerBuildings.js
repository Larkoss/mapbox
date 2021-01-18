map.on('load', function () {
    map.addSource('buildings-data', {
        type: 'geojson',
        data: '/buildingsWGS84.geojson',
        //cluster: true

    });

    map.addLayer({
        'id': 'buildings-data',
        'type': 'fill',
        'source': 'buildings-data',
        'layout': {
            //'icon-allow-overlap': 'false'
        },
        'paint': {
            'fill-color': '#34f7d7',
            'fill-opacity': 0.8
        }
    });

});
