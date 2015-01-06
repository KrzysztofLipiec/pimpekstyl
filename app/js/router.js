define([
    'app',
    'home/home.files',
    'products/products.files',
    'common/common.files',
    'language/language.files'

], function ( app, Home, Products, Common, Language ) {
    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            "home": "index",
            "products/:subsite": "products",
            "*actions": "defaultRoute"
        },

        index: function () {
//            app.db.set({
//                title: "Hello World!",
//                author: "Firebase",
//                location: {
//                    city: "San Francisco",
//                    state: "California",
//                    zip: 94103
//                }
//            });
            app.db.child("location/city").on("value", function(snapshot) {
                console.log(snapshot.val());
            });
            this.goTo('mainLayout/main-layout', {
                '.header': new Common.views.Header(),
                '.content': new Language.views.ChooseLanguage()
            });
        },

        products: function (subsite) {
            switch (subsite) {
                case "all":
                    this.goTo('mainLayout/main-layout', {
                        '.header': new Common.views.Header(),
                        '.content': new Products.views.All()
                    });

                    break;
                default:
                        this.defaultRoute();
                    break;
            }
        },

        goTo: function (layout, views) {
            var self = this;
            self.mainLayout = app.useLayout(layout);

            self.mainLayout.afterRender = function () {
                var temp = app.renderedViews;

                app.renderedViews=[];
                $.each(views, function (key, value) {
                    app.renderedViews.push(value.id);
                    if(!_.contains(temp, value.id)){
                        value.$el = $(key);
                        value.myRender();
                    }
                });
            };
            self.mainLayout.myRender();
        },


        defaultRoute: function () {
            app.useLayout('mainLayout/404').render();
        }

    });

    return Router;
});
