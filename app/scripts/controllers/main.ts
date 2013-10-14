'use strict';

module app.controller {

  export class Main {

    constructor (private $scope) {

    }

  }

}

app.registerController('Main', ['$scope']);