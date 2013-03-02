var App = {};

require.config({

    baseUrl: './',
    
    paths: {
        
        // Libraries
        text:       'libs/require/text',
        jquery:     'libs/jquery-1.9.0.min',
        underscore: 'libs/underscore-min',
        backbone:   'libs/backbone-min',
        
        // Application Places
        view:       'js/views',
        model:      'js/models',
        collection: 'js/collections'
        
    },
    
    shim: {
        underscore: {
            exports:    '_'
        },
        backbone: {
            deps:       [ 'underscore', 'jquery' ],
            exports:    'Backbone'
        }
    }
    
});
        
define([
    'backbone',
    'jquery',
    'view/main_view',
    'view/map_view',
    'model/user'
],function(
    Backbone,
    $,
    MainView,
    MapView,
    ModelUser   
){
    //inizializzo il model dell'utente con i dati di facebook
    App.user = new ModelUser(); 

    //inizializzo la mainview, passandogli il model dell'utente
    App.mainview = new MainView({model: App.user,el: '#wrapper'});

    //rimane in ascolto del trigger LOGIN
    $(document).on('login', function () {
        FB.login(function(response) {
        }, {scope: 'publish_actions'});
        return false;
    });

    //rimane in ascolto del trigger LOGOUT
    $(document).on('logout', function () {
    FB.logout();
    return false;
    });

    //al cambiamento dello stato LOGIN/LOGOUT aggiorna il model dello user
    $(document).on('fbStatusChange', function (event, data) {
    if (data.status === 'connected') {
        FB.api('/me', function (response) {
            App.user.set(response); // Aggiorna il model
            App.mapview = new MapView({el: '#content'});
        });
    } else {
        App.user.set(App.user.defaults); // Reset del model con i valori di default
    }
});

});


