module app.controller {

  export class CourseDetail {

    public course;
    public drivingSchool;
    public lessons;
    public students;
    public teachers;
    public newLesson;
    public newStudent;
    public isNew;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api,
                private auth, private $location:ng.ILocationService) {

      if($routeParams.id) {
        this.isNew = false;
        this.api.getCourse($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.course = response.data;
        }, (reason) => {
          alert('Nepodarilo se nacist kurz: ' + reason);
        }).then(() => {
          this.setUpNewLesson();
        });

        this.api.getLessons($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.lessons = response.data.teorie;
        }, (reason) => {
          alert('Nepodarilo se nacist kurz: ' + reason);
        });

        this.api.getStudents($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.students = response.data.studenti;
        }, (reason) => {
          alert('Nepodarilo se nacist kurz: ' + reason);
        });

        this.api.getTeachers($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
          this.teachers = response.data.ucitele;
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

        this.setUpNewLesson();
      }

      this.api.getDrivingSchool($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });
    }

    private setUpNewLesson() {
      var nowDate = new Date();
      var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
      var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

      this.newLesson = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
        "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
        "kurz-id": this.course.id
      };
    }

    public saveCourse(course) {
      if(this.isNew) {
        this.api.createCourse(course).then((response) => {
          this.course = response.data; this.isNew = false;
        }, (reason) => {
          alert('Chyba: ' + reason);
        });
      } else {
        this.api.updateCourse(course).then((response) => {
          this.course = response.data;
        }, (reason) => {
          alert("Chyba: " + reason);
        });
      }
    }

    public createLesson(lesson) {
      this.api.createLesson(lesson).then((response) => {
        this.lessons.push(response.data);
      }, (reason) => { alert('Chyba: ' + reason); });
    }

    public createStudent(student) {
      this.api.createStudent(student).then(angular.noop, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteCourse(course) {
      this.api.deleteCourse(course).then(() => {
        this.$location.path( "/autoskola/" + this.drivingSchool.id + "/kurzy" );
      }, (reason) => { alert('Chyba: ' + reason); });
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