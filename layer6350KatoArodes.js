map.on('load', function () {
    map.addSource('kato-arodes', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Larkoss/mapbox/main/BU1_6350_KATO_ARODES_clean.geojson?token=AFZKYB4XQHWCB6CASYUGZ6TABCPAC'
    });
});

const layerKatoArodes = {
    'id': 'kato-arodes-buildings',
    'type': 'fill',
    'source': 'kato-arodes',
    'layout': {},
    'paint': {
        'fill-color': '#34f7d7',
        'fill-opacity': 0.8
    }
};
