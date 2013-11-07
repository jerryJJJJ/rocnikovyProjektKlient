module app.controller {

  export class StudentDetail {

    public drivingSchool;
    public student;
    public lessons;
    public rides;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api,
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

      this.api.getStudentLessons($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.lessons = response.data.teorie;
      }, (reason) => {
        alert('Nepodarilo se nacist lekce: ' + reason);
      });
    }

    public saveStudent(student) {
      this.api.updateStudent(student).then(() => {alert("vytvoreno");}, (reason) => { alert('Chyba: ' + reason); });
    }
  }
}

app.registerController('StudentDetail');