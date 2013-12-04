

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

    constructor(private $http:ng.IHttpService, $routeParams:RouteParamsDrivingSchool, private auth:app.service.Auth,
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

    public deleteTeacher(teacher) {
      this.api.deleteTeacher(teacher).then(() => {
        this.teachers.remove(teacher);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
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