import Q from 'q';
import $ from 'jquery';

let markers = [];

let Map = function(el, dataProvider) {
    this._map = null;
    this.dataProvider = dataProvider;
};

Map.prototype.render = function() {
    L.mapbox.accessToken =
        'pk.eyJ1IjoidGE0aSIsImEiOiI4empHMW5ZIn0.7fzc433UgerEsMuGbnwIUQ';
    this.map = L.mapbox.map('map', 'mapbox.streets')
        .setView([40, -74.50], 14);

    $('.leaflet-bottom.leaflet-right').css({
        opacity: 0
    });
};

Map.prototype.goTo = function(lon, lat) {
    this.map.setView({lat: lat, lng: lon})
};

Map.prototype.getCoords = function() {
    let dfd = Q.defer();
    let center = this.map.getCenter();
    setTimeout(function() {
        dfd.resolve(center);
    }, 0);
    return dfd.promise;
};
Map.prototype.showPopup = function(options) {
    var latLng = options.latLng;
    var message = options.message;

    markers.push(
        L.marker(latLng)
            .bindPopup(message)
            .addTo(this.map)
    );
};

export default Map;
