'use strict';

module app.controller {

  export class VehicleDetail {

    private isNew:bool;

    public drivingSchool;

    public vehicle;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService) {

      $http.get("/autoskoly/"+$routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });

      if($routeParams.id) {
        this.isNew = false;
        //mame presne idecko -> jedna se o editaci existujiciho, takze ho nacteme
        $http.get("/vozidla/"+$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.vehicle = response.data;
        }, (reason) => {
          alert('Nepodarilo se nacist vozidlo: ' + reason);
        });
      } else {
        this.isNew = true;
        //jedna se o nove auto - nastavime defaultni hodnoty
        this.vehicle = {
          "pocatecni-stav-km": 0
        }; //proto nastavime auto na prazdny objekt
      }

    }

    public save() {
      //nyni se musi poslat pres metodu PUT na api v pripade ze se vozidlo upravuje zaroven s ideckem
      //nebo POST v pripade ze se vozidlo vytvari
      //tady je jedna tabulka kde to je krasne videt jak se ma REST API navrhovat http://cs.wikipedia.org/wiki/Representational_State_Transfer
    }
  }

}

app.registerController('VehicleDetail');