define([
	'backbone',
	'model/place'
],function(
	Backbone,
	PlaceModel
){
	return Backbone.Collection.extend({

		model: PlaceModel
		
	});
	
});