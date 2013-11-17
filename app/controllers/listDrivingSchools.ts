/// <reference path="../components/types/angularjs/angular.d.ts"/>
/// <reference path="../../../../download/klient/services/api.ts"/>
/// <reference path="../lib/indexedArray.ts"/>
/// <reference path="../app.ts"/>

module app.controller {

  export class ListDrivingSchools {

    public static resolve : any = {
      'listSchools': (api:app.service.Api) => {
        return api.getDrivingSchools().then((response) => {
          return new app.lib.IndexedArray('autoskola_id', response.data['autoskoly']);
        });
      }
    }

    constructor(private $http:ng.IHttpService, $routeParams:RouteParamsListDrivingSchools, private api:app.service.Api,
                public listSchools:app.lib.IndexedArray, private $location:ng.ILocationService, private auth:app.service.Auth) {
    }

    public createDrivingSchool() {
      this.$location.path("/autoskola/nove");
    }
  }
}

app.registerController('ListDrivingSchools');