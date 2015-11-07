import Q from 'q';

var Geo = function() {

};
Geo.prototype.getLocation = function() {
    var dfd = Q.defer();
    navigator.geolocation.getCurrentPosition(
        function(position) {
            dfd.resolve(position);
        },
        function(error) {
            dfd.reject(error);
        }
    );
    return dfd.promise;
};

export default Geo;
