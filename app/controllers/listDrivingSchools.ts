/// <reference path="../components/types/angularjs/angular.d.ts"/>
/// <reference path="../services/api.ts"/>
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
                public listSchools:app.lib.IndexedArray) {
    }
  }

}

app.registerController('ListDrivingSchools');