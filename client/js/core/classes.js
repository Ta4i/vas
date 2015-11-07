
import B from 'backbone';
import Q from 'q';

var classes = {};

classes.Model = B.Model.extend({
    initialize: function() {
        B.Model.prototype.initialize.apply(this, arguments);
        this.bootstraped = false;
    },
    bootstrap: function() {
        var instance = this;
        var dfd = Q.defer();
        if (this.bootstraped) {
            setTimeout(function() {
                dfd.resolve(instance);
            }, 0);
        } else {
            this.fetch()
                .then(function(model) {
                    instance.bootstraped = true;
                    dfd.resolve(instance);
                })
                .fail(function(error) {
                    dfd.reject(error);
                });
        }
        return dfd.promise;
    }
});

classes.Collection = B.Collection.extend({
    initialize: function() {
        B.Collection.prototype.initialize.apply(this, arguments);
        this.bootstraped = false;
    },
    bootstrap: function() {
        var instance = this;
        var dfd = Q.defer();
        if (this.bootstraped) {
            setTimeout(function() {
                dfd.resolve(instance);
            }, 0);
        } else {
            this.fetch()
                .then(function(model) {
                    instance.bootstraped = true;
                    dfd.resolve(instance);
                })
                .fail(function(error) {
                    dfd.reject(error);
                });
        }
        return dfd.promise;
    }
});

classes.View = B.View.extend({
    initialize: function(options) {
        B.View.prototype.initialize.apply(this, arguments);
        this.options = options;
    }
});

classes.Error = function(data) {

};

export default classes;
