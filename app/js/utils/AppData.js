define([
    'jquery',
    'underscore'
], function ($, _) {
    var baseFacebookURL = 'https://graph.facebook.com/oauth/authorize?type=user_agent&display=page&client_id={APP_ID}&redirect_uri={REDIRECT_URI}&scope={PERMISSIONS}';

    var configurations = {};

    // TODO: update this settings
    configurations['production'] = {
        appRoot: '/',
        appUrl: window.location.protocol+"//"+window.location.host,
        facebook: {
            appId: '416887958390068',
            permissions: [
                'user_about_me',
            ],

            getLoginURL: function(next) {
                var redirectURI = window.location.protocol + '//' + window.location.host + config.appRoot + 'auth';

                if (next) {
                    redirectURI += '?next=' + next;
                }

                return baseFacebookURL
                    .replace('{APP_ID}', this.appId)
                    .replace('{REDIRECT_URI}', redirectURI)
                    .replace('{PERMISSIONS}', this.permissions.join(','));
            }
        }
    };

    configurations['local'] = $.extend(true, {}, configurations['production'], {
        facebook: {
            appId: '383223541772931'
        }        
    });


    configurations['dev'] = $.extend(true, {}, configurations['production'], {
        facebook: {
            appId: '402695183150165'
        }
    });

    function getEnv() {
        switch (window.location.host) {
            case 'ikea.unit9':
                return 'local';

            case 'svn550.dev.unit9.net':
                return 'dev';

            default:
                return 'production';
        }
    }

    var config = configurations[getEnv()];


    return config;
});
