define([
    'underscore',
    'jquery',
    'handlebars',
    'utils/AppData',
    'backbone',
    'backbone.layoutmanager',
    'facebook',
], function (_, $, Handlebars, config, Backbone) {
    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    var app = {
        root: "/",
        lang: "pol",
        db : new Firebase("https://pimpekstyl.firebaseio.com/"),
        myView: Backbone.View.extend({
            readyState: null,
            loadData: function () {
                var view = this;
                view.readyState = $.Deferred();

                view.readyState.resolve();
            },
            myRender: function () {
                var view = this;
                view.loadData();
                view.readyState.done(function () {
                    view.render();
                });
            }
        }),
        renderedViews: [],
        myLayout: Backbone.Layout.extend({
            renderable: true,
            myRender: function () {
                if (this.renderable) {
                    this.render();
                } else {
                    this.afterRender();
                }
            }
        })
    };

    // Adding some helpers for handlebar
    Handlebars.registerHelper('if_eq', function (a, b, options) {
        if (a == b)
            return options.fn(this);
        return options.inverse(this);
    });

    Handlebars.registerHelper('if_else', function (a, b, options) {
        if (a != b)
            return options.fn(this);
        return options.inverse(this);
    });

    Handlebars.registerHelper('safe', function (a) {
        return new Handlebars.SafeString(a);
    });
    Handlebars.registerHelper('eachSubmenu', function (context, parent, options) {
        var ret = "";
        for (var prop in context) {
            ret = ret + options.fn({key: prop, value: context[prop], parent: parent});
        }
        return ret;
    });
    Handlebars.registerHelper('eachToDisplayProperty', function (context, toDisplays, options) {
        var ret = "";
        var toDisplayKeyList = toDisplays.split(",");
        for (var i = 0; i < toDisplayKeyList.length; i++) {
            var toDisplayKey = toDisplayKeyList[i];
            if (context[toDisplayKey]) {
                ret = ret + options.fn({
                    property: toDisplayKey,
                    value: context[toDisplayKey]
                });
            }

        }
        return ret;
    });
    // Configure LayoutManager with Backbone Boilerplate defaults.
    Backbone.LayoutManager.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        prefix: "templates/",

        fetch: function (path) {
            var done;

            // Add the html extension.
            path = path + ".html";

            // If the template has not been loaded yet, then load.
            if (!JST[path]) {
                done = this.async();
                return $.ajax({ url: app.root + path }).then(function (contents) {
                    JST[path] = Handlebars.compile(contents);
                    JST[path].__compiled__ = true;

                    done(JST[path]);
                });
            }

            // If the template hasn't been compiled yet, then compile.
            if (!JST[path].__compiled__) {
                JST[path] = Handlebars.template(JST[path]);
                JST[path].__compiled__ = true;
            }

            return JST[path];
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {
        // Helper for using layouts.
        useLayout: function (name, options) {
            console.log(this.lang);
            // If already using this Layout, then don't re-inject into the DOM.
            if (this.layout && this.layout.options.template === name) {
                this.layout.renderable = false;
                return this.layout;
            }

            // If a layout already exists, remove it from the DOM.
            if (this.layout) {
                this.layout.remove();
                app.renderedViews = [];
            }

            // Create a new Layout with options.
            var layout = new app.myLayout(_.extend({
                template: name,
                className: "layout " + name,
                id: "layout"
            }, options));

            // Insert into the DOM.
            $("#main").empty().append(layout.el);

            // Render the layout.
            //layout.render();

            // Cache the refererence.
            this.layout = layout;

            // Return the reference, for chainability.
            return layout;
        }
    }, Backbone.Events);
});
