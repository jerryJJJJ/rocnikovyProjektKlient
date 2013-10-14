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
  'app.filter',
  'app.service'
]);


angular.module('app').config(($routeProvider:ng.IRouteProvider) => {
  $routeProvider.when('/', {
    templateUrl:  'views/main.html',
    controller:   'app.controller.Main',
    controllerAs: "mainCtrl"
  })
  $routeProvider.when('/ucitele', {
    templateUrl:  'views/teachers.html',
    controller:   'app.controller.Teachers',
    controllerAs: "teachersCtrl"
  })
  $routeProvider.otherwise({ redirectTo: '/'});
});

angular.module('app').run(($httpBackend:ng.IHttpBackendService) => {
  apiary.forEach(function (section) {
    var resources = section.resources;
    resources.forEach(function (res) {
      var url = '/api/v1' + res.url;
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
   * Rozhrani pro vsechny controllery.
   */
  export interface IController {}

  /**
   * Rozhrani pro vsechny direktivy.
   */
  export interface IDirective {}

  /**
   * Rozhrani pro vsechny filtry
   */
  export interface IFilter {
    filter (input:string): string;
  }

  /**
   * Rozhrani pro vsechny sluzby.
   */
  export interface IService {}

  /**
   * Registrace noveho controlleru.
   *
   * @param className
   * @param services
   */
  export function registerController(className:string, services = []) {
    var controller = 'app.controller.' + className;
    services.push(app.controller[className]);
    angular.module('app.controller').controller(controller, services);
  }

  /**
   * Registrace nove direktivy.
   *
   * @param className
   * @param services
   */
  export function registerDirective(className:string, services = []) {
    var directive = className.toLowerCase();
    services.push(function () {
      return new app.directive[className]();
    });
    angular.module('app.directive').directive(directive, services);
  }

  /**
   * Registrace noveho filtru.
   *
   * @param className
   * @param services
   */
  export function registerFilter(className:string, services = []) {
    var filter = className.toLowerCase();
    services.push(function () {
      var obj = new app.filter[className]();
      return obj.filter;
    });
    angular.module('app.filter').filter(filter, services);
  }

  /**
   * Registrace nove sluzby.
   *
   * @param className
   * @param services
   */
  export function registerService(className:string, services = []) {
    var service = className.toLowerCase();
    services.push(function () {
      return new app.service[className]();
    });
    angular.module('app.service').factory(service, services);
  }
}