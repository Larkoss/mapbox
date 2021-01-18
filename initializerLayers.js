//Attach created layers
map.on('load', function () {
    
    var layers = map.getStyle().layers;

    //the addLayer method takes 2 arguments: the layer as an object, and a string
    // representing another layer's name. if the other layer
    // exists in the stylesheet already, the new layer will be positioned
    // right before that layer in the stack, making it possible to put
    // 'overlays' anywhere in the layer stack.
    // Insert the layer beneath the first symbol layer.
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    
    //map.addLayer(layer3dBuildings);
    //map.addLayer(layerDeck);
    //map.addLayer(layerTerrainLines);
    //map.addLayer(layerKatoArodes);
    //map.addLayer(layerStRaphaelMarina);
    map.addLayer(layerBuildings, firstSymbolId); 
    
});