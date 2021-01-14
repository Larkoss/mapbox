map.on('load', function () {
    map.addSource('buildings-data', {
        type: 'geojson',
        data: '/buildingsWGS84.geojson',
        //cluster: true
    });

    // map.addLayer({
    //     id: 'clusters',
    //     type: 'circle',
    //     source: 'buildings-data',
    //     filter: ['has', 'point_count'],
    //     paint: {
    //         // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    //         // with three steps to implement three types of circles:
    //         //   * Blue, 20px circles when point count is less than 100
    //         //   * Yellow, 30px circles when point count is between 100 and 750
    //         //   * Pink, 40px circles when point count is greater than or equal to 750
    //         'circle-color': [
    //             'step',
    //             ['get', 'point_count'],
    //             '#51bbd6',
    //             100,
    //             '#f1f075',
    //             750,
    //             '#f28cb1'
    //         ],
    //         'circle-radius': [
    //             'step',
    //             ['get', 'point_count'],
    //             20,
    //             100,
    //             30,
    //             750,
    //             40
    //         ]
    //     }
    // });

    // map.addLayer({
    //     id: 'cluster-count',
    //     type: 'symbol',
    //     source: 'buildings-data',
    //     filter: ['has', 'point_count'],
    //     layout: {
    //         'text-field': '{point_count_abbreviated}',
    //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //         'text-size': 12
    //     }
    // });

    // map.addLayer({
    //     id: 'unclustered-point',
    //     type: 'circle',
    //     source: 'buildings-data',
    //     filter: ['!', ['has', 'point_count']],
    //     paint: {
    //         'circle-color': '#11b4da',
    //         'circle-radius': 4,
    //         'circle-stroke-width': 1,
    //         'circle-stroke-color': '#fff'
    //     }
    // });

    map.addLayer( {
        'id': 'buildings-data',
        'type': 'fill',
        'source': 'buildings-data',
        'layout': {},
        'paint': {
            'fill-color': '#34f7d7',
            'fill-opacity': 0.8
        }
    });

});
