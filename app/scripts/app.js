'use strict';
angular.module('app.controller', []);
angular.module('app.directive', []);
angular.module('app.filter', []);
angular.module('app.service', []);

angular.module('app', [
    'app.controller',
    'app.directive',
    'ngRoute',
    'ngResource',
    'ngMockE2E',
    'app.filter',
    'app.service'
]);

angular.module('app').config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'app.controller.Main',
        controllerAs: "mainCtrl"
    });
    $routeProvider.when('/ucitele', {
        templateUrl: 'views/teachers.html',
        controller: 'app.controller.Teachers',
        controllerAs: "teachersCtrl"
    });
    $routeProvider.otherwise({ redirectTo: '/' });
});

angular.module('app').run(function ($httpBackend) {
    apiary.forEach(function (section) {
        var resources = section.resources;
        resources.forEach(function (res) {
            var url = res.url;

            //url = url.replace(/{[^}]+}/g, 'ZDROJAK_PARAM');
            //preg_quote pro javascript: http://stackoverflow.com/questions/6828637/escape-regexp-strings
            url = url.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '' + '-]', 'g'), '\\$&');
            url = url.replace(/ZDROJAK_PARAM/g, '([^&]*)');
            url = new RegExp(url + '$');

            switch (res.method) {
                case 'GET':
                    $httpBackend.whenGET(url).respond(res.responses[0].status, res.responses[0].body);
                    break;
                case 'POST':
                    $httpBackend.whenPOST(url).respond(res.responses[0].status, res.responses[0].body);
                    break;
                case 'PUT':
                    $httpBackend.whenPUT(url).respond(res.responses[0].status, res.responses[0].body);
                    break;
                case 'DELETE':
                    $httpBackend.whenDELETE(url).respond(res.responses[0].status, res.responses[0].body);
                    break;
            }
        });
    });

    //nechat projit pozadavky na sablony
    $httpBackend.whenGET(/^\/*views\//).passThrough();
});

var app;
(function (app) {
    /**
    * Registrace noveho controlleru.
    *
    * @param className
    * @param services
    */
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'app.controller.' + className;
        services.push(app.controller[className]);
        angular.module('app.controller').controller(controller, services);
    }
    app.registerController = registerController;

    /**
    * Registrace nove direktivy.
    *
    * @param className
    * @param services
    */
    function registerDirective(className, services) {
        if (typeof services === "undefined") { services = []; }
        var directive = className.toLowerCase();
        services.push(function () {
            return new app.directive[className]();
        });
        angular.module('app.directive').directive(directive, services);
    }
    app.registerDirective = registerDirective;

    /**
    * Registrace noveho filtru.
    *
    * @param className
    * @param services
    */
    function registerFilter(className, services) {
        if (typeof services === "undefined") { services = []; }
        var filter = className.toLowerCase();
        services.push(function () {
            var obj = new app.filter[className]();
            return obj.filter;
        });
        angular.module('app.filter').filter(filter, services);
    }
    app.registerFilter = registerFilter;

    /**
    * Registrace nove sluzby.
    *
    * @param className
    * @param services
    */
    function registerService(className, services) {
        if (typeof services === "undefined") { services = []; }
        var service = className.toLowerCase();
        services.push(function () {
            return new app.service[className]();
        });
        angular.module('app.service').factory(service, services);
    }
    app.registerService = registerService;
})(app || (app = {}));
//# sourceMappingURL=app.js.map
