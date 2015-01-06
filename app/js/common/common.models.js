define([
    'backbone'
], function ( Backbone ) {
    return {
        ui:{
            pol: Backbone.Model.extend({
                url: '/data/polui.json'
            }),
            eng: Backbone.Model.extend({
                url: '/data/engui.json'
            })
        }
    }
});