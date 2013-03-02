/**
 * Learning Backbone
 * -> Collections App
 *
 * @author: MPeg [marco(dot)pegoraro(at)gmail(dot)com]
 *
 */






define([
	'underscore',
	'backbone',
	
	// Sub Views
	'view/place_view'

],function(
	_,
	Backbone,
	
	// Sub Views
	PlaceView

){
	
	return Backbone.View.extend({
		
		initialize: function() {
			
			// Binds collection's events to internal rendering functions.
			this.collection.on( 'add', this.addItem, this );
			this.collection.on( 'reset', this.render, this );
			
		},
		
		
		/**
		 * the "render()" method simply sets up a welcome waiting message for the list.
		 * the real scope for this view is to display items but item comes binded with the collection!
		 */
		render: function() {
			
			// set a waiting message.
			this.$el.html('<li class="waiting label label-info" style="min-height:1em">Waiting for places to display...</li>');
			
		},
		
		addItem: function( placeModel ) {
			
			// remove waiting message if exists.
			if ( this.$('.waiting').length ) this.$('.waiting').slideUp(function(){ $(this).remove(); });
			
			// create an instance of the sub-view to render the single tweet item.
			var placeItem = new PlaceView({
				model: 		placeModel
			});
			
			// append sub-view DOM node to the view's node.
			this.$el.append( placeItem.el );
			
		}
		
	});
	
});