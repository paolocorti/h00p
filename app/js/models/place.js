define([
	'backbone'

],function(
	Backbone

){
	
	return Backbone.Model.extend({

		defaults: {
			status: 	'disactive'
		},
		
		toJSON: function() {
			
			return {
				
				tweet: Backbone.Model.prototype.toJSON.call( this )
				
			};
			
		}
		
	});
	
});