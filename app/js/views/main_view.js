define([
    'underscore',
    'backbone',
    'text!tpl/main.html',
    'view/login_view'

],function(
    _,
    Backbone,
    MainTemplate,
    LoginView
){
    
    return Backbone.View.extend({

    template: _.template( MainTemplate ),

    events: {
            "click #login" : "login"
        },

    initialize: function () {
        console.log('init')
        this.render();  
    },

    render: function () {
        this.$el.html(this.template());
        var loginview = new LoginView({ model: this.model,el: '#login'});
        return this;
    },

    login: function (e) {
        console.log('login');
        $(document).trigger('login');
        this.showHideButtons();
        return false;
    },

    showHideButtons: function () {
        console.log('showHideButtons');
         $('.btn-login', this.el).addClass('hidden');
    }

});

});