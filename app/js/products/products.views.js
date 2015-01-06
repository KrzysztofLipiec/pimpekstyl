define([
    'app'
], function ( app ) {
    var Views = {
        All : app.myView.extend({
            id:"allProducts",
            template: "products/all"
        })
    };

    return Views;
});