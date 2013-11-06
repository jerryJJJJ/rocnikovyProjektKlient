'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;
    public vehicles;
    public listType:string;
    public courses;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService) {

      var autoskolaId:string = $routeParams.id;
      this.listType = $routeParams.listType ? $routeParams.listType : 'vozidla';

      //TODO reqest do Api service
      $http.get("/autoskoly/" + autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
        this.vehicles = new app.lib.IndexedArray(this.drivingSchool.vozidla);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });


      //TODO *** stejne jako se tu nacitaji kurzy, nacital bych i ostatni zvlast a ne v ramci autoskoly (s parametrem autoskola_id)
      //     bude to odpovidat RESTOvemu api a programmerovi serveru se to bude lepe programovat..

      //TODO *** do restoveho api bych urcite nedaval "pocet-vozidel" atd... at mame API ciste, pokud chces tyto informace vypisovat
      //     tak jelikoz data nacitame vsechna, staci pri vypisovani napsat napr. drivingSchoolCtrl.vehicles.length (vehicles
      //     je klasicke pole)

      //TODO reqest patri do Api service
      $http.get("/kurzy?autoskola_id="+autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.courses = response.data.kurzy;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    deleteVehicle(vehicle) {
      //TODO reqest patri do Api service
       this.$http.delete("/vozidla/" + vehicle.id).then((response:ng.IHttpPromiseCallbackArg) => {
        alert(response.status);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('DrivingSchool');