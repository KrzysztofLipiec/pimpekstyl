define([
    'app',
    'backbone',
    'common/common.models'
], function (app, Backbone, common_models) {
    var views = {
        Header: app.myView.extend({
            id: "headerView",
            template: "mainLayout/header",
            loadData: function () {
                var view = this,
                    model = new common_models.ui[app.lang]();

                view.readyState = $.Deferred();

                model.fetch().done(function () {
                    view.model = model;
                    view.readyState.resolve();
                });
            },
            afterRender: function () {
                var view = this;
                $(".languages").change(function () {
                    app.lang = this.value;
                    view.myRender();
                });
            },
            data: function () {
                var view = this;
                return {
                    'copy': view.model.toJSON()
                };
            }
        })
    };
    return views;
});