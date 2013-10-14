'use strict';

module app.controller {

  export class Teachers {

    public teachers:Array;


    constructor(private $scope:ng.IScope, private $http:ng.IHttpService) {
      $http.get("http://ronkovprojektapi.apiary.io/ucitele").then((value) => {
        this.teachers = value.ucitele;
      });
    }

  }

}

app.registerController('Teachers', ['$scope', '$http']);