define([
    'underscore',
    'backbone',
    'text!tpl/login.html'

],function(
    _,
    Backbone,
    LoginTemplate
){
    
        return Backbone.View.extend({

        initialize: function () {
            this.template = _.template(LoginTemplate);
            this.model.on("change", this.render, this);
            this.render();

        },

        render: function () {
                        console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        events: {
            'click .login': 'login',
            'click .logout': 'logout'
        },

        login: function (e) {
            $(document).trigger('login');
            return false;
        },

        logout: function (e) {
            $(document).trigger('logout');
            return false;
        }

    });
});