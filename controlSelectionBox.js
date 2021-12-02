var bldsDisplay = document.getElementById('blds');
var rdsDisplay = document.getElementById('rds');
map.on('load', function () {
    var canvas = map.getCanvasContainer();

    // Variable to hold the starting xy coordinates
    // when `mousedown` occured.
    var start;

    // Variable to hold the current xy coordinates
    // when `mousemove` or `mouseup` occurs.
    var current;

    // Variable for the draw box element.
    var box;

    // Set `true` to dispatch the event before other functions
    // call it. This is necessary for disabling the default map
    // dragging behaviour.
    canvas.addEventListener('mousedown', mouseDown, true);

    // Return the xy coordinates of the mouse position
    function mousePos(e) {
        var rect = canvas.getBoundingClientRect();
        return new mapboxgl.Point(
            e.clientX - rect.left - canvas.clientLeft,
            e.clientY - rect.top - canvas.clientTop
        );
    }

    function mouseDown(e) {
        // Continue the rest of the function if the shiftkey is pressed.
        if (!(e.shiftKey && e.button === 0)) return;

        // Disable default drag zooming when the shift key is held down.
        map.dragPan.disable();

        // Call functions for the following events
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('keydown', onKeyDown);

        // Capture the first xy coordinates
        start = mousePos(e);
    }

    function onMouseMove(e) {
        // Capture the ongoing xy coordinates
        current = mousePos(e);

        // Append the box element if it doesnt exist
        if (!box) {
            box = document.createElement('div');
            box.classList.add('boxdraw');
            canvas.appendChild(box);
        }
        var minX = Math.min(start.x, current.x),
            maxX = Math.max(start.x, current.x),
            minY = Math.min(start.y, current.y),
            maxY = Math.max(start.y, current.y);

        // Adjust width and xy position of the box element ongoing
        var pos = 'translate(' + minX + 'px,' + minY + 'px)';
        box.style.transform = pos;
        box.style.WebkitTransform = pos;
        box.style.width = maxX - minX + 'px';
        box.style.height = maxY - minY + 'px';
    }

    function onMouseUp(e) {
        // Capture xy coordinates
        finish([start, mousePos(e)]);
    }

    function onKeyDown(e) {
        // If the ESC key is pressed
        if (e.keyCode === 27) finish();
    }

    function finish(bbox) {
        // Remove these events now that finish has been called.
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('mouseup', onMouseUp);

        if (box) {
            box.parentNode.removeChild(box);
            box = null;
        }


        // If bbox exists. use this value as the argument for `queryRenderedFeatures`
        if (bbox) {
            var features = map.queryRenderedFeatures(bbox, {
                layers: ['buildings-data']
            });

            //if (features.length >= 1000) {
            //    return window.alert('Select a smaller number of features');
            //}

            var featuresRoads = map.queryRenderedFeatures(bbox, {
                layers: ['roads']
            });

            bldsDisplay.textContent = features.length;
            rdsDisplay.textContent = featuresRoads.length;
            //console.log("You selected " + features.length + " buildings");
            //console.log("You selected " + featuresRoads.length + " roads");

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

            //mycode
            //console.log(start, current);
        }

        map.dragPan.enable();
    }

    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['buildings-data-highlighted']
        });
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';

        if (!features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];

        popup
            .setLngLat(e.lngLat)
            .setText(feature.properties.COUNTY)
            .addTo(map);
    });
});