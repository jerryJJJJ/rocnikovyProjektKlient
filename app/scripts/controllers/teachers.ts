'use strict';

module app.controller {

  export class Teachers {

    public teachers:Array;


    constructor(private $scope:ng.IScope, private $http:ng.IHttpService) {
      $http.get("/ucitele").then((response:ng.IHttpPromiseCallbackArg) => {
        this.teachers = response.data.ucitele;
      });
    }

  }

}

app.registerController('Teachers', ['$scope', '$http']);