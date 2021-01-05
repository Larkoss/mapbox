mapboxgl.accessToken = 'pk.eyJ1IjoibGFya29zcyIsImEiOiJja2l5Zmc3YzIweG5pMnVueGhvbGl4YTRoIn0.wU9Ffc67yk_AuB6WyRXNTw';

//Initialize map
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',  //style url
    center: [33.410593, 35.145551],     //starting position [lng, lat]
    zoom: 16,
    pitch: 45,                          //angle
    bearing: 0,
    container: 'map',
    antialias: true
});

// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function () {
    // Insert the layer beneath any symbol layer.
    //Symbol layers are layers of text/icons
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#dab', //shade of red

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
            }
        },
        labelLayerId
    );

    

});


