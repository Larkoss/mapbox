//Attach created layers
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

    map.addLayer(layer3dBuildings);
    map.addLayer(layerTerrainLines);
    map.addLayer(layerDeck);
});