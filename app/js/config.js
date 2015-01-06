requirejs.config({
    deps: ['main'],

    paths: {
        'underscore': 'vendor/underscore-min',
        'handlebars': 'vendor/handlebars-1.0.rc',
        'backbone': 'vendor/backbone-min',
        'backbone.layoutmanager': 'vendor/backbone.layoutmanager',
        'text': 'vendor/require-plugins/text',
        'i18n': 'vendor/require-plugins/i18n',
        'templates': '../templates',
        'models': 'models',
        'collections': 'collections',
        'views': 'views',
        'utils': 'utils',
        'facebook': '//connect.facebook.net/en_US/all'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'backbone.layoutmanager': ['backbone'],
        'facebook': {
            exports: 'FB'
        },
    }
});
