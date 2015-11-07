var _ = require('lodash');
var utils = require('util');
var EventEmitter = require('events').EventEmitter;
var WebSocketServer = require('ws').Server;

var WS = function() {
    var instance = this;
    EventEmitter.call(this);
    this.wss = new WebSocketServer({ port: 8888 });

    this.wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            try{
                var data = JSON.parse(message);
            } catch(error) {
                throw Error(error);
            }
            console.log('received:');
            console.log(data);
            instance.processMessage(data, ws);
        });
    });
};

utils.inherits(WS, EventEmitter);

_.assign(WS.prototype, {
    processMessage: function(data, ws) {
        console.log('Process data', data);
        this.emit(data.type, {
            data: data,
            ws: ws
        })
    },
    broadcast: function(data) {
        this.wss.clients.forEach(function each(client) {
            client.send(JSON.stringify(data));
        });
    },
    send: function(data, ws) {
        ws.send(JSON.stringify(data));
    }
});

module.exports = WS;
