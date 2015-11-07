import _ from 'lodash';
import b from 'backbone';
import Q from 'q';
var Events = b.Events;
var WS_URL = 'ws://' + window.location.hostname+ ':8888/';

var DataProvider = function() {
    this.load = Q.defer();
    this.events = _.clone(Events);
    this.ws = new WebSocket(WS_URL);
};

_.assign(DataProvider.prototype, {
    applyWebSocketEvents: function() {
        var instance = this;
        this.ws.onopen = function() {
            console.log('connection opened');
            instance.load.resolve(instance);
        };
        this.ws.onmessage = function (evt)
        {
            var received_msg = JSON.parse(evt.data);
            console.log('Message', received_msg);
            instance.events.trigger(
                received_msg.type,
                received_msg.data
            );
        };
        return this.load.promise;
    },
    makeNote: function(options) {
        this.send(options);
    },
    send: function(obj) {
        this.ws.send(JSON.stringify(obj));
    },
    getCurrent: function() {
        this.ws.send(JSON.stringify({
            type: 'GET_CURRENT_NOTES'
        }));
    }
});

export default DataProvider;
