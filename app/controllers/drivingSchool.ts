'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;
    public vehicles;
    public teachers;
    public courses;
    public listType:string;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api) {

      var autoskolaId:string = $routeParams.id;
      this.listType = $routeParams.listType ? $routeParams.listType : 'vozidla';

      this.api.getDrivingSchool(autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });

      this.api.getCourses(autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.courses = response.data.kurzy;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });

      this.api.getTeachers(autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.teachers = response.data.ucitele;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });

      this.api.getVehicles(autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.vehicles = response.data.vozidla;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    deleteVehicle(vehicle) {
      this.api.deleteVehicle(vehicle).then((response:ng.IHttpPromiseCallbackArg) => {
        this.$location.path("/autoskola/" + this.drivingSchool.id + "/vozidla");
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('DrivingSchool');