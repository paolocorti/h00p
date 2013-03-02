define([
    'backbone'

],function(
    Backbone

){
    return Backbone.Model.extend({
    defaults: {
        "id":  "",
        "name":     "",
        "first_name":    "",
        "last_name":    "",
        "gender":    "",
        "username":    "",
        "link":    "",
        "locale":    "",
        "timezone":    ""
    }
    });
});