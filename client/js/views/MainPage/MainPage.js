import mapbox from 'mapbox.js';
import Geo from '../../components/Geo.js';
import Map from  '../../views/Map/Map.js';
import AddNote from './AddNote/AddNote.js';
import DefaultNote from '../../views/DefaultNote/DefaultNote.js';

let MainPage = function(options) {
    var el = document.querySelector('#map');
    this.dataProvider = options.dataProvider;
    this.map = new Map(el, this.dataProvider);
    this.geo = new Geo();
    this.addNoteButton = new AddNote();
    this.defaultNote = new DefaultNote();

    this.applyEvents();
};

MainPage.prototype.applyEvents = function() {
    var instance = this;
    this.addNoteButton.onClick = this.addNote.bind(this);

    this.dataProvider.applyWebSocketEvents()
        .done(function(dataProvider) {
            dataProvider.events.on('NOTES_CHANGE', function(data) {
                console.log('Update notes', data);
                data.notes.forEach(function(note) {
                    instance.map.showPopup({
                        latLng: note.coord,
                        message: note.message
                    });
                });
            });
            dataProvider.events.on('NOTES', function(data) {
                console.log('NOTES', data);
                data.notes.forEach(function(note) {
                    instance.map.showPopup({
                        latLng: note.coord,
                        message: note.message
                    });
                });
            });
            dataProvider.getCurrent();
        });
};
MainPage.prototype.render = function() {
    this.map.render();
};
MainPage.prototype.showMe = function() {
    var instance = this;
    this.geo.getLocation()
        .then(function(p) {
            var crd = p.coords;
            console.log('Position', crd, p);
            instance.map.goTo(crd.longitude, crd.latitude);
        })
        .fail(function(e) {
            console.log('Error', e);
        });
};
MainPage.prototype.addNote = function() {
    var instance = this;
    this.defaultNote.show();
    this.defaultNote.onAdd = function(message) {
        instance.sendNote(message);
    };
    //$(document).on('click', hideIt);

    function hideIt() {
        instance.defaultNote.hide();
        //$(document).off('click', hideIt);
    }
};
MainPage.prototype.sendNote = function(message) {
    var instance = this;
    this.defaultNote.hide();
    this.map.getCoords()
        .done(function(latLng) {
            instance.dataProvider.makeNote({
                type: 'ADD_NOTE',
                latLng,
                message
            });
        });
};

export default MainPage;
