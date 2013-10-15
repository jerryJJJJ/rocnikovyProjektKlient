/// <reference path="./components/types/angularjs/angular.d.ts" />

'use strict';

angular.module('app.controller', []);
angular.module('app.directive', []);
angular.module('app.filter', []);
angular.module('app.service', []);


angular.module('app', [
  'app.controller',
  'app.directive',
  'ngRoute',
  'ngMockE2E',
  'app.filter',
  'app.service'
]);


angular.module('app').config(($routeProvider:ng.IRouteProvider) => {

  $routeProvider.when('/', {
    templateUrl:  'views/main.html',
    controller:   'app.controller.Main',
    controllerAs: "mainCtrl"
  });
  $routeProvider.when('/ucitele', {
    templateUrl:  'views/teachers.html',
    controller:   'app.controller.Teachers',
    controllerAs: "teachersCtrl"
  });
  $routeProvider.otherwise({ redirectTo: '/'});

});

angular.module('app').run(($httpBackend:ng.IHttpBackendService) => {


  apiary.forEach(function (section) {
    var resources = section.resources;
    resources.forEach(function (res) {
      var url = res.url;
      //preg_quote pro javascript: http://stackoverflow.com/questions/6828637/escape-regexp-strings
      url = url.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '' + '-]', 'g'), '\\$&');
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

});

module app {

  export module controller {
  }

  export module directive {
  }

  export module filter {
  }

  export module service {
  }


  /**
   * Registrace noveho controlleru.
   */
  export function registerController(className:string) {
    var controller = className.charAt(0).toLowerCase() + className.substr(1);
    angular.module('app.controller').controller(controller, app.controller[className]);
  }

  /**
   * Registrace nove direktivy.
   */
  export function registerDirective(className:string) {
    var directive = className.charAt(0).toLowerCase() + className.substr(1);
    angular.module('app.directive').directive(directive, app.directive[className]);
  }

  /**
   * Registrace noveho filtru.
   */
  export function registerFilter(className:string) {
    var filter = className.charAt(0).toLowerCase() + className.substr(1);
    angular.module('app.filter').filter(filter, app.filter[className]);
  }

  /**
   * Registrace nove sluzby.
   */
  export function registerService(className:string) {
    var service = className.charAt(0).toLowerCase() + className.substr(1);
    angular.module('app.service').factory(service, app.service[className]);
  }
}