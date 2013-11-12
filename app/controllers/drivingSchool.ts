/// <reference path="../components/types/angularjs/angular.d.ts"/>
/// <reference path="../services/api.ts"/>
/// <reference path="../lib/indexedArray.ts"/>
/// <reference path="../app.ts"/>


module app.controller {

  export interface RouteParamsDrivingSchool extends ng.IRouteParamsService{
    listType: string;
    id: string;
  }

  export class DrivingSchool {

    public static resolve : any = {
      'drivingSchool': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getDrivingSchool($route.current.params.id).then((response) => response.data);
      },
      'courses': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getCourses($route.current.params.id).then((response) => {
          return new app.lib.IndexedArray('kurz_id', response.data['kurzy']);
        });
      },
      'vehicles': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getVehicles($route.current.params.id).then((response) => {
          return new app.lib.IndexedArray('vozidlo_id', response.data['vozidla']);
        });
      },
      'teachers': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getTeachers($route.current.params.id).then((response) => {
          return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
        });
      }
    };


    public listType:string;

    constructor(private $http:ng.IHttpService, $routeParams:RouteParamsDrivingSchool,
                private api:app.service.Api, private $location:ng.ILocationService, public drivingSchool:Object,
                public teachers:app.lib.IndexedArray, public courses:app.lib.IndexedArray,
                public vehicles:app.lib.IndexedArray) {

      var autoskolaId:string = $routeParams.id;
      this.listType = $routeParams.listType ? $routeParams.listType : 'vozidla';
    }

    public deleteVehicle(vehicle) {
      this.api.deleteVehicle(vehicle).then(() => {
        this.vehicles.remove(vehicle);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public createVehicle() {
      this.$location.path( "/autoskola/" + this.drivingSchool.autoskola_id + "/vozidla/nove" );
    }

    public createTeacher() {
      this.$location.path( "/autoskola/" + this.drivingSchool.autoskola_id + "/ucitele/nove" );
    }

    public createCourse() {
      this.$location.path( "/autoskola/" + this.drivingSchool.autoskola_id + "/kurzy/nove" );
    }

    public deleteCourse(course) {
      this.api.deleteCourse(course).then(() => {
        this.courses.remove(course);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('DrivingSchool');