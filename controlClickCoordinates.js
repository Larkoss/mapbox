// Create variables for the latitude and longitude
var lng;
var lat;
var lngDisplay = document.getElementById('lng');
var latDisplay = document.getElementById('lat');
var eleDisplay = document.getElementById('ele');
var bldsDisplay = document.getElementById('blds');
var rdsDisplay = document.getElementById('rds');

var marker = new mapboxgl.Marker({
    'color': '#314ccd'
});

var markerHighest = new mapboxgl.Marker({
    'color': '#f54242'
});

map.on('load', function () {
    map.on('click', function (e) {
        // Use the returned LngLat object to set the marker location
        // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
        marker.setLngLat(e.lngLat).addTo(map);


        // Create variables set to the LngLat object's lng and lat properties
        lng = e.lngLat.lng;
        lat = e.lngLat.lat;


        var bbox = [
            [e.point.x - 209.3, e.point.y - 209.3],
            [e.point.x + 209.3, e.point.y + 209.3]
        ];
        var features = map.queryRenderedFeatures(bbox, {
            layers: ['buildings-data']
        });
        var featuresRoads = map.queryRenderedFeatures(bbox, {
            layers: ['roads']
        });

        bldsDisplay.textContent = features.length;
        rdsDisplay.textContent = featuresRoads.length;

        // Run through the selected features and set a filter
        // to match features with unique FIPS codes to activate
        // the `counties-highlighted` layer.
        var filter = features.reduce(
            function (memo, feature) {
                memo.push(feature.properties.objectid);
                return memo;
            },
            ['in', 'objectid']
        );
        //console.log(filter);
        map.setFilter('buildings-data-highlighted', filter);
        
        var filterRoads = featuresRoads.reduce(
            function (memo, feature) {
                memo.push(feature.properties.id);
                return memo;
            },
            ['in', 'id']
        );
        map.setFilter('roads-highligted', filterRoads);
        getElevation();
    });
});

function getElevation() {
        // Make the API request
        // add radius to the request
        var radius = 1000;
        var query = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + '.json?layers=contour&limit=50&radius=' + radius + '&access_token=' + mapboxgl.accessToken;
        $.ajax({
            method: 'GET',
            url: query,
        }).done(function (data) {
            // Get all the returned features in radius
            var allFeatures = data.features;
            //console.log(allFeatures);
            // Find the maxumim elevation and store the location
            var max = -1000, imax = -1;
            for (i = 0; i < allFeatures.length; i++){
                //console.log(allFeatures[i].properties);
                if (allFeatures[i].properties.ele > max) {
                    max = allFeatures[i].properties.ele;
                    imax = i;
                }
            }
            var highestElevation = max;
            // Display the largest elevation value
            eleDisplay.textContent = highestElevation + ' meters';
            console.log(allFeatures[imax].geometry.coordinates);
            var maxll = new mapboxgl.LngLat(allFeatures[imax].geometry.coordinates[0], allFeatures[imax].geometry.coordinates[1]);
            markerHighest.setLngLat(maxll).addTo(map);
            // Display the longitude and latitude values
            lngDisplay.textContent = maxll.lng.toFixed(4);
            latDisplay.textContent = maxll.lat.toFixed(4);
        });
    }
