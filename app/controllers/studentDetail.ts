module app.controller {

  export class StudentDetail {

    public drivingSchool;
    public student;
    public lessons;
    public rides;
    public courseId=this.$routeParams.kurzId;
    public vehicleId=this.$routeParams.vozidloId;
    public teachers;

    constructor(private $scope, private $http:ng.IHttpService, private $routeParams:ng.IRouteParamsService, private api:app.service.Api,
                private auth, private $location:ng.ILocationService) {
      this.api.getDrivingSchool($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });

      this.api.getStudent($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.student = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist studenta: ' + reason);
      });

      this.api.getStudentRides($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.rides = response.data.jizdy;
      }, (reason) => {
        alert('Nepodarilo se nacist jizdy: ' + reason);
      });

      this.api.getTeachers($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.teachers = new app.lib.IndexedArray('ucitel_id', response.data.ucitele);
      }, (reason) => {
        alert('Nepodarilo se nacist jizdy: ' + reason);
      });

      this.api.getStudentLessons($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.lessons = response.data.teorie;
      }, (reason) => {
        alert('Nepodarilo se nacist lekce: ' + reason);
      });
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
        this.$location.path( "/autoskola/" + this.drivingSchool.autoskola_id + "/kurzy/" + this.courseId );
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('StudentDetail');