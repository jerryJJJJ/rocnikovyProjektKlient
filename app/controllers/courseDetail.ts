module app.controller {

  export class CourseDetail {

    public course;
    public newLesson;
    public drivingSchool;
    public newStudent;
    public isNew;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api, private auth) {

      if($routeParams.id != "nove") {
        this.isNew = false;
        $http.get("/kurzy/"+$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.course = response.data;
        }, (reason) => {
          alert('Nepodarilo se nacist kurz: ' + reason);
        });
      } else {
        this.isNew = true;
        var nowDate = new Date();
        var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
        var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

        this.course = {
          "datum-od": nowDate.getFullYear() + "-" + month + "-" + day,
          "datum-do": nowDate.getFullYear() + "-" + ((month + 3 > 12) ? 12 : month + 3) + "-" + day
        };
      }

      $http.get("/autoskoly/"+$routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });

      var nowDate = new Date();
      var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
      var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

      this.newLesson = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
        "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
      };
    }

    public saveCourse(course) {
      (this.isNew) ? this.api.createCourse(course).then((response) => { this.course = response.data; this.isNew = false; }, (reason) => { alert('Chyba: ' + reason); })
        : this.api.updateCourse(course).then((response) => { this.course = response.data; }, (reason) => { alert("Chyba: " + reason); });
    }

    public createLesson(lesson) {
      this.api.createLesson(lesson).then(() => {alert("vytvoreno");}, (reason) => { alert('Chyba: ' + reason); });
    }

    public createStudent(student) {
      this.api.createStudent(student).then(() => {alert("vytvoreno");}, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteCourse(course) {
      this.api.deleteCourse(course).then(() => { window.location.assign("/#/autoskola/" + this.drivingSchool.id + "/kurzy"); }, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteDocument(document) {
      this.api.deleteDocument(document).then(angular.noop, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteLesson(lesson) {
      this.api.deleteLesson(lesson).then(angular.noop, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteStudent(student) {
      this.api.deleteStudent(student).then(angular.noop, (reason) => { alert('Chyba: ' + reason); });
    }
  }
}

app.registerController('CourseDetail');