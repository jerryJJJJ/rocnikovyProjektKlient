/// <reference path="../../../app/components/types/angularjs/angular.d.ts" />
/// <reference path="../../../app/components/types/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../app/components/types/jasmine/jasmine.d.ts" />

/// <reference path="../../../app/scripts/controllers/main.ts" />

'use strict';

describe('Controller: app.controller.Main', function () {

  var ctrl;

  beforeEach(function(){
    angular.mock.module('app');
    angular.mock.inject(function ($controller) {
      ctrl = $controller('app.controller.Main', {
        $scope: {}
      });
    });
  });


  it('...', function () {

  });
});