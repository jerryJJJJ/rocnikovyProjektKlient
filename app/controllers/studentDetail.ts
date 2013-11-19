module app.controller {

  export class StudentDetail {

    public courseId=this.$routeParams.kurzId;
    public vehicleId=this.$routeParams.vozidloId;

    public static resolve : any = {
      'drivingSchool': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getDrivingSchool($route.current.params.autoskolaId).then((response) => response.data);
      },
      'lessons': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getLessons($route.current.params.kurzId).then((response) => {
          return new app.lib.IndexedArray('teorie_id', response.data['teorie']);
        });
      },
      'student': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getStudent($route.current.params.id).then((response) => response.data);
      },
      'teachers': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getTeachers($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
        });
      },
      'rides': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getRides($route.current.params.id).then((response) => {
          return new app.lib.IndexedArray('jizda_id', response.data['jizdy']);
        });
      }
    };

    constructor(private $http:ng.IHttpService, public $routeParams:RouteParamsStudentDetail, private auth:app.service.Auth,
                private api:app.service.Api, private $location:ng.ILocationService, public drivingSchool:Object, private $scope,
                public student:Object, public teachers:app.lib.IndexedArray, public rides:app.lib.IndexedArray,
                public lessons:app.lib.IndexedArray) {
    }

    public saveStudent(student) {
      this.api.updateStudent(student).then((response) => {
        this.student = response.data;
      }, (reason) => {
        alert("Chyba: " + reason);
      });
    }

    public deleteStudent(student) {
      this.api.deleteStudent(student).then(() => {
        var path;
        if(this.courseId) {
          path = "/autoskola/" + this.drivingSchool.autoskola_id + "/kurzy/" + this.courseId;
        } else {
          path = "/autoskola/" + this.drivingSchool.autoskola_id + "/vozidla/" + this.vehicleId;
        }
        this.$location.path( path );
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('StudentDetail');