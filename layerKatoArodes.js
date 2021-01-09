map.on('load', function () {
    map.addSource('kato-arodes', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Larkoss/mapbox/main/BU1_6350_KATO_ARODES.geojson?token=AFZKYB3QRLFE2NTWN4FRVJDAAMYWQ'
    });
});

const layerKatoArodes = {
    'id': 'kato-arodes-buildings',
    'type': 'fill',
    'source': 'kato-arodes',
    'layout': {},
    'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
    }
};
