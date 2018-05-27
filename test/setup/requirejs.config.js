require.config({
    baseUrl: "../",
    urlArgs: '@BUILD',
    paths: {
        jquery:                 'vendor/jquery/dist/jquery',
        'jquery-ui':            'vendor/jquery-ui/jquery-ui',
        less:                   'vendor/require-less/less',
        lessc:                  'vendor/require-less/lessc',
        normalize:              'vendor/require-less/normalize',
        text:                   'vendor/requirejs-text/text',
        'vendor/jsutils':       'vendor/common-micro-libs/src/jsutils',
        'vendor/domutils':      'vendor/common-micro-libs/src/domutils'
    },
    shim: {
        'jquery-ui': {
            deps: ['jquery']
        },
        'SPWidgets': {
            deps: ['jquery', 'jquery-ui']
        }
    },
    less: {
        relativeUrls: true,
        logLevel    : 2
    }
});