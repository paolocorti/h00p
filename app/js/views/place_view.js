/**
 * Learning Backbone
 * -> Collections App
 *
 * @author: MPeg [marco(dot)pegoraro(at)gmail(dot)com]
 *
 */


define([
	// Frameworks
	'underscore',
	'backbone',
	
	// Templates
	'text!templates/place_template.html'

],function(
	// Frameworks
	_,
	Backbone,
	
	// Templates
	PlaceTemplate

){
	
	return Backbone.View.extend({
		
		// sets up the container (this.$el) type
		tagName: 'li',
		
		// compile the template loaded from an external text file by RequestJS
		template: _.template( PlaceTemplate ),
		
		
		
		initialize: function() {
			
			// bind model's canges to the render() method to mantain interface up to date.
			this.model.on( 'change', this.render, this );
			
			this.render();
			
		},
		
		render: function() {
			
			this.$el.html( this.template( this.model.toJSON() ) );
			
		}
		
	});
	
});