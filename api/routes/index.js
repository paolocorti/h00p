var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

//var mongoUri = process.env.MONGOLAB_URI || 'mongodb://admin:admin@ds035147.mongolab.com:35147/heroku_app11175619';

var mongoUri = "mongodb://admin:admin@mongo.onmodulus.net:27017/pepa7pOt";
//var mongoUri = "mongodb://@localhost:27017/hoopdb"

/*********************************  PLACES   *********************************/
/*
{ name:,
  adress:,
  city:,
  province:,
  state:,
  cap:,
  loc:[lat,lng],
  radius:,
  type:[],
  tags:[],
  total_users: [id_user, sex, count], 
  vote:[id_user, vote],
  n_event: [],
  info: [],
  img_profile:,
  img_users: [],
  private_data {  pi:,
                  mail:,
                  owner:,
                  phone:,
                  date_ins:,
                  date_del:,
                  date_upd,
                  profile:,
                  uniquetoken: },
  event: { active:,
           start_time:,
           end_time:,
           n_users: [id_user, sex],
           comments:[]}
}

- ADD count
- ADD TAG
- ADD COMMENT
- ADD VOTE
- GET BY RATE
- GET BY TAG
- GET BY N OF USERS
- GET BY MY TAGS
- GET BY FRIENDS TAGS
*/

/*-- GET ALL PLACES --*/
// return all places in db
exports.findAllPlaces = function(req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find().toArray(function(err, items) {
          res.send(items); 
      });
    }); 
  });
};

/*-- GET PLACES BY CITY --*/
// return all places filtered by city
exports.findPlaceByCity = function(req, res) {
  var city = decodeURIComponent(req.params.city);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find({'city': city}).toArray(function(err, items) {
        if (err) {
              res.send({'error':'An error has occurred'});
        } else {
          res.send(items);
        }
      });
    });
  });
};

/*-- GET PLACES BY PROVINCE --*/
// return all places filtered by city
exports.findPlaceByProvince = function(req, res) {
  var province = decodeURIComponent(req.params.province);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find({'province': province}).toArray(function(err, items) {
        if (err) {
              res.send({'error':'An error has occurred'});
        } else {
          res.send(items);
        }
      });
    });
  });
};

/*-- GET PLACES BY PROXIMITY --*/
// return all places filtered by geospatial coord
exports.findPlaceByGeo = function(req, res) {
  var lng = parseFloat(req.params.lng);
  var lat = parseFloat(req.params.lat);
  var dist = parseFloat(req.params.dist);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.executeDbCommand({ geoNear : "places", near : [lng,lat], spherical : true, maxDistance : dist }, function(err, result) { 
        if (err) {
              res.send({'error':'An error has occurred'});
        } else {
          res.send(result);
        }
    }); 
    });
}

/*-- GET PLACES IN RADIUS --*/
// return all places filtered by geospatial coord
exports.findPlaceInRadius = function(req, res) {
  var lng = parseFloat(req.params.lng);
  var lat = parseFloat(req.params.lat);
  var rad = parseFloat(req.params.rad);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find({"loc":{$within:{$centerSphere:[[lng, lat], rad]}}}).toArray(function(err, items) {
        if (err) {
              res.send({'error':'An error has occurred'});
        } else {
          res.send(items);
        }
    });
  });
});
}


/*-- GET PLACE BY ID --*/
// return one place from his id
exports.findPlaceById = function(req, res) {
    var id = req.params.id;
    mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            }
        });
    });
    });
};


/*-- GET PLACE BY NAME --*/
// return one place from his name
exports.findPlaceByName = function(req, res) {
  var name = req.params.name;
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find({'name': name}, function(err, item) {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(item);
            }
      });
    });
  });
};

/*-- GET PLACE BY TYPE --*/
// return all places from his type
exports.findPlaceByType = function(req, res) {
  var type = req.params.type;
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find({'type': type}).toArray(function(err, items){
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              res.send(items);
            }
      });
    });
  });
};

/*-- ADD PLACES --*/

exports.addPlace = function(req, res) {
  var data = req.body;
  data.loc[0] = parseFloat(data.loc[0]);
  data.loc[1] = parseFloat(data.loc[1]);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.insert(data,{safe:true},function(err, item) {
          res.send(item[0]);
      });
    });
  });
}

/*-- UPDATE PLACES --*/

exports.updatePlace = function(req, res) {
  var id = req.params.id;
  var place = req.body;
  place.loc[0] = parseFloat(place.loc[0]);
  place.loc[1] = parseFloat(place.loc[1]);
  console.log(place);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.update({'_id':new BSON.ObjectID(id)},place,{safe:true},function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                res.send(place);
            }
      });
    });
  });
}

/*-- DELETE PLACES --*/

exports.deletePlace = function(req, res) {
  var id = req.params.id;
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.remove({'_id':new BSON.ObjectID(id)},{safe:true}, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                res.send(req.body);
            }
      });
    });
  });
}


/*********************************  PLACE IMPORTED   *********************************/

/*-- GET ALL PLACES IMPORTED --*/
// return all places imported from external sources
exports.findAllPlacesImported = function(req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places-import', function(err, collection) {
      collection.find().toArray(function(err, items) {
          res.send(items); 
      });
    }); 
  });
};

/*-- ADD PLACES --*/
// add places imported from external sources
exports.addPlaceImported = function(req, res) {
  var data = req.body;
  data.loc[0] = parseFloat(data.loc[0]);
  data.loc[1] = parseFloat(data.loc[1]);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places-import', function(err, collection) {
      collection.insert(data,{safe:true},function(err, item) {
          res.send(item[0]);
      });
    });
  });
}

/*-- DELETE PLACES --*/
// delete place imported from external sources
exports.deletePlaceImported = function(req, res) {
  var id = req.params.id;
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places-import', function(err, collection) {
      collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                res.send(req.body);
            }
      });
    });
  });
}

exports.dropPlaceImported = function(req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places-import', function(err, collection) {
      collection.drop();
    });
  });
}

/*-- UPDATE PLACES --*/
// update place imported from external sources
exports.updatePlaceImported = function(req, res) {
  var id = req.params.id;
  var place = req.body;
  place.loc[0] = parseFloat(place.loc[0]);
  place.loc[1] = parseFloat(place.loc[1]);
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.update({'_id':new BSON.ObjectID(id)}, place, function(err, item) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
      });
    });
  });
}

/*-- EXPORT PLACES --*/
// export place imported from external sources to main collection
exports.exportPlaceImported = function(req, res) {
  var id = req.params.id;
  var data;
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places-import', function(err, collection) {
        collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              db.collection('places', function(err, collection) {
                collection.insert(item,{safe:true},function(err, item2) {
                  res.send(item2[0]);
                  });
              });
            }
        });
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, item) {
      });
  });
});
}


/*********************************  USERS   *********************************/
/*
{ - id
  - name
  - surname
  - age
  - gender
  - picture
  - nickname
  - password
  - myprovince
  - mystate
  - mycity
  - mylat
  - mylng
  - mygeotag []
  - myvote []
  - mytags []
  - mycomments []
 - mail

}
*/

/*-- ADD USER --*/
// add user 
exports.addUser = function(req, res) {
  var data = req.body;
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('users', function(err, collection) {
      collection.insert(data,{safe:true},function(err, item) {
          res.send(item[0]);
      });
    });
  });
}

/*-- GET ALL USERSS --*/
// return all users in db
exports.findAllUsers = function(req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('places', function(err, collection) {
      collection.find().toArray(function(err, items) {
          res.send(items); 
      });
    }); 
  });
};
