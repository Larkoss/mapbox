mapboxgl.accessToken = 'pk.eyJ1IjoibGFya29zcyIsImEiOiJja2l5Zmc3YzIweG5pMnVueGhvbGl4YTRoIn0.wU9Ffc67yk_AuB6WyRXNTw';

//Initialize map
var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',  //style url
    center: [33.410593, 35.145551],     //starting position [lng, lat]
    zoom: 16,
    pitch: 0,                          //angle
    bearing: 0,
    container: 'map',
    minPitch: 30,                       //If the pitch goes to 0 the 3d buildings wont be visible
    antialias: true
});

