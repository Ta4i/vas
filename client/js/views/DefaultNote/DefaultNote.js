import $ from 'jquery';
import V from './../../core/classes.js';

//import template from './DefaultNote.html';
//
//let DefaultNote = V.View.extend({
//    //className: '',
//    //tagName: '',
//    template: template,
//    events: {},
//    initialize: function(options) {
//        V.View.prototype.initialize.apply(this, arguments);
//    },
//    show: function() {
//        $('body').append(this.template({
//            data: 'SOMETHING'
//        }));
//    }
//});

let DefaultNote = function() {
    this.$root = $('.note-container');
    this.$container = this.$root.find('.note-pane').eq(0);
};

DefaultNote.prototype.show = function() {
    this.$container.empty();
    this.$container.append(this.getNoteTextarea());
    this.$container.append(this.getNoteAdd());
    this.$root.show();
    this.applyEvents();
};

DefaultNote.prototype.hide = function() {
    this.$root.hide();
    this.$container.empty();
    this.removeEvents();
};

DefaultNote.prototype.applyEvents = function() {
    var instance = this;
    this.$button.on('click', function() {
        var message = instance.$text.val();
        instance.onAdd(message);
    });
};

DefaultNote.prototype.removeEvents = function() {
    this.$button.off('click');
};

DefaultNote.prototype.getNoteTextarea = function() {
    this.$text = $('<textarea />');
    return this.$text;
};

DefaultNote.prototype.getNoteAdd = function() {
    this.$button = $('<button>Leave the note</button>');
    return this.$button;
};

DefaultNote.prototype.onAdd = $.noop;


export default DefaultNote;
