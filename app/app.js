'use strict';
angular.module('app.controller', []);
angular.module('app.directive', []);
angular.module('app.filter', []);
angular.module('app.service', []);

angular.module('app', [
    'app.controller',
    'app.directive',
    'ngRoute',
    'ngLocale',
    'ngCookies',
    'app.filter',
    'app.service',
    'ngUpload',
    'upload.button'
]);

angular.module('app').config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    //$httpProvider.defaults.headers.post['X-Content-Type'] = 'application/json';
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'app.controller.Main',
        controllerAs: "mainCtrl"
    });
    $routeProvider.when('/autoskoly', {
        templateUrl: 'views/listDrivingSchools.html',
        controller: 'app.controller.ListDrivingSchools',
        controllerAs: "listDrivingSchoolsCtrl",
        resolve: app.controller.ListDrivingSchools.resolve
    });
    $routeProvider.when('/autoskola/nove', {
        templateUrl: 'views/createDrivingSchool.html',
        controller: 'app.controller.CreateDrivingSchool',
        controllerAs: "createDrivingSchoolCtrl"
    });
    $routeProvider.when('/autoskola/:id', {
        templateUrl: 'views/drivingSchool.html',
        controller: 'app.controller.DrivingSchool',
        controllerAs: "drivingSchoolCtrl",
        resolve: app.controller.DrivingSchool.resolve
    });
    $routeProvider.when('/autoskola/:id/nastaveni', {
        templateUrl: 'views/settings.html',
        controller: 'app.controller.Settings',
        controllerAs: "settingsCtrl",
        resolve: app.controller.Settings.resolve
    });
    $routeProvider.when('/autoskola/:id/:listType', {
        templateUrl: 'views/drivingSchool.html',
        controller: 'app.controller.DrivingSchool',
        controllerAs: "drivingSchoolCtrl",
        resolve: app.controller.DrivingSchool.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/vozidla/nove', {
        templateUrl: 'views/vehicleDetail.html',
        controller: 'app.controller.VehicleDetail',
        controllerAs: "vehicleDetailCtrl",
        resolve: app.controller.VehicleDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/vozidla/:id', {
        templateUrl: 'views/vehicleDetail.html',
        controller: 'app.controller.VehicleDetail',
        controllerAs: "vehicleDetailCtrl",
        resolve: app.controller.VehicleDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/ucitele/nove', {
        templateUrl: 'views/teacherDetail.html',
        controller: 'app.controller.TeacherDetail',
        controllerAs: "teacherDetailCtrl",
        resolve: app.controller.TeacherDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/ucitele/:id', {
        templateUrl: 'views/teacherDetail.html',
        controller: 'app.controller.TeacherDetail',
        controllerAs: "teacherDetailCtrl",
        resolve: app.controller.TeacherDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/kurzy/nove', {
        templateUrl: 'views/courseDetail.html',
        controller: 'app.controller.CourseDetail',
        controllerAs: "courseDetailCtrl",
        resolve: app.controller.CourseDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/kurzy/:id', {
        templateUrl: 'views/courseDetail.html',
        controller: 'app.controller.CourseDetail',
        controllerAs: "courseDetailCtrl",
        resolve: app.controller.CourseDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/kurzy/:kurzId/dochazka/:id', {
        templateUrl: 'views/courseAttendance.html',
        controller: 'app.controller.CourseAttendance',
        controllerAs: "courseAttendanceCtrl",
        resolve: app.controller.CourseAttendance.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/vozidla/:vozidloId/studenti/:id', {
        templateUrl: 'views/studentDetail.html',
        controller: 'app.controller.StudentDetail',
        controllerAs: "studentDetailCtrl",
        resolve: app.controller.StudentDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/kurzy/:kurzId/studenti/:id', {
        templateUrl: 'views/studentDetail.html',
        controller: 'app.controller.StudentDetail',
        controllerAs: "studentDetailCtrl",
        resolve: app.controller.StudentDetail.resolve
    });
    $routeProvider.when('/autoskola/:autoskolaId/ucitele/:ucitelId/studenti/:id', {
        templateUrl: 'views/studentDetail.html',
        controller: 'app.controller.StudentDetail',
        controllerAs: "studentDetailCtrl",
        resolve: app.controller.StudentDetail.resolve
    });
    $routeProvider.otherwise({ redirectTo: '/' });
});

angular.module('app').run(function ($httpBackend, auth, $locale, $rootScope) {
    $locale.DATETIME_FORMATS.MONTH1P = [
        "leden", "únor", "březen",
        "duben", "květen", "červen",
        "červenec", "srpen", "září",
        "říjen", "listopad", "prosinec"
    ];

    $rootScope.$locale = $locale;

    auth.tryCookieLogin();
    /*
    apiary.forEach(function (section) {
    var resources = section.resources;
    resources.forEach(function (res) {
    var url = res.url;
    url = url.replace(/{[^}]+}/g, 'ZDROJAK_PARAM');
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
    
    //nechat projit pozadavky na "view" sablony
    $httpBackend.whenGET(/^\/*views\//).passThrough();
    */
});

var app;
(function (app) {
    /**
    * Registrace noveho controlleru.
    */
    function registerController(className) {
        var controller = className.charAt(0).toLowerCase() + className.substr(1);
        angular.module('app.controller').controller(controller, app.controller[className]);
    }
    app.registerController = registerController;

    /**
    * Registrace nove direktivy.
    */
    function registerDirective(className) {
        var directive = className.charAt(0).toLowerCase() + className.substr(1);
        angular.module('app.directive').directive(directive, function () {
            return new app.directive[className]();
        });
    }
    app.registerDirective = registerDirective;

    /**
    * Registrace noveho filtru.
    */
    function registerFilter(className) {
        var filter = className.charAt(0).toLowerCase() + className.substr(1);
        angular.module('app.filter').filter(filter, function () {
            return app.filter[className].filter;
        });
    }
    app.registerFilter = registerFilter;

    /**
    * Registrace nove sluzby.
    */
    function registerService(className) {
        var service = className.charAt(0).toLowerCase() + className.substr(1);
        angular.module('app.service').service(service, app.service[className]);
    }
    app.registerService = registerService;
})(app || (app = {}));
//# sourceMappingURL=app.js.map
