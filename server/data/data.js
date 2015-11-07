var _ = require('lodash');
var utils = require('util');
var EventEmitter = require('events').EventEmitter;

var notes = [];
var Data = function() {
    EventEmitter.call(this);
};
utils.inherits(Data, EventEmitter);

_.assign(Data.prototype, {
    addNote: function(note) {
        notes.push(note);
        this.emit('notes:change', notes);
        return this;
    },
    getNotes: function() {
        return notes;
    }
});

module.exports = Data;
