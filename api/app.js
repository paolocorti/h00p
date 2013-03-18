var express = require('express')
  , api = require('./routes/index')
  , http = require('http')
  , path = require('path');


var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

//******************** PLACES ***************************

//app.get('/', api.findAllPlaces);
app.get('/places', api.findAllPlaces);
app.get('/places/city/:city', api.findPlaceByCity);
app.get('/places/province/:province', api.findPlaceByProvince);
app.get('/places/geo/:lng/:lat/:dist', api.findPlaceByGeo);
app.get('/places/radius/:lng/:lat/:rad', api.findPlaceInRadius);
app.get('/places/name/:name', api.findPlaceByName);
app.get('/places/type/:type', api.findPlaceByType);
app.get('/places/id/:id', api.findPlaceById);
app.post('/places', api.addPlace);
app.put('/places/update/:id', api.updatePlace);
app.delete('/places/delete/:id', api.deletePlace);

//************** IMPORTAZIONE PLACES *******************

app.get('/places-import', api.findAllPlacesImported);
app.post('/places-import', api.addPlaceImported);
app.put('/places-import/update/:id', api.updatePlaceImported);
app.delete('/places-import/delete/:id', api.deletePlaceImported);
app.get('/places-import/drop',api.dropPlaceImported);
app.get('/places-import/export/:id', api.exportPlaceImported);

//********************  AUTH  **************************

//app.get('/auth/facebook', passport.authenticate('facebook'), { scope: ['read_stream', 'publish_actions'] });
/*app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/backend',
                                      failureRedirect: '/' }));*/

//********************  USER  **************************

app.get('/user', api.findAllUsers);
app.get('/user/id/:id', api.findPlaceById);
app.post('/user', api.addUser);
app.put('/user/update/:id', api.updateUser);
app.delete('/user/delete/:id', api.deleteUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
