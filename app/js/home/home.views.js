define([
    'app'
], function ( app ) {
    var homeViews = {
        ChooseLanguage : app.myView.extend({
            id:"homeView",
            template: "home/index.html"
        })
    };

    return homeViews;
});