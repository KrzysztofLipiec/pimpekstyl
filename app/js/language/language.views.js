define([
    'app'
], function ( app ) {
    var Views = {
        ChooseLanguage : app.myView.extend({
            id:"chooseLanguage",
            template: "language/chooseLanguage"
        })
    };

    return Views;
});