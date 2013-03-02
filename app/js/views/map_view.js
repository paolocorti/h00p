define([
	'underscore',
	'backbone',
	'text!tpl/map.html'
],function(
	_,
	Backbone,
	MapTemplate
){
	
	return Backbone.View.extend({

		tagName: 'div',

		template: _.template( MapTemplate ),
		
		initialize: function() {

        	this.render();
			
		},
		
		render: function() {
			this.$el.html(this.template());
			console.log('render map view');
			this.loadmap();
            return this;
        },

        loadmap: function() {

        	console.log('map view');
			
			mapbox.auto('map', 'hoop-app.map-cpbe40pe');

        }
		
	});
	
});