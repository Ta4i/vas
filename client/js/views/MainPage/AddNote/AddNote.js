import $ from 'jquery';

let AddNote = function() {
    this.$el = $('.add-note').eq(0);

    this.applyEvents();
};

AddNote.prototype.applyEvents = function() {
    var instance = this;
    this.$el.on('click', function() {
        instance.onClick();
    });
};

AddNote.prototype.onClick = $.noop;

export default AddNote;
