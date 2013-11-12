module app.controller {

  export class CourseDetail {

    public course;
    public drivingSchool;
    public lessons;
    public students;
    public teachers;
    public newLesson;
    public newStudent={};
    public isNew;


    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api,
                private auth, private $location:ng.ILocationService) {

      if($routeParams.id) {
        this.isNew = false;
        this.api.getCourse($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.course = response.data;
          this.setUpNewLesson();
        }, (reason) => {
          alert('Nepodarilo se nacist kurz: ' + reason);
        });

        this.api.getLessons($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.lessons = new app.lib.IndexedArray('teorie_id', response.data.teorie);
        }, (reason) => {
          alert('Nepodarilo se nacist hodiny teorie: ' + reason);
        });

        this.api.getStudents($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.students = new app.lib.IndexedArray('student_id', response.data.studenti);
        }, (reason) => {
          alert('Nepodarilo se nacist studenty: ' + reason);
        });

        this.api.getTeachers($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
          this.teachers =  new app.lib.IndexedArray('ucitel_id', response.data.ucitele);
        }, (reason) => {
          alert('Nepodarilo se nacist ucitele: ' + reason);
        });

      } else {
        this.isNew = true;
        var nowDate = new Date();
        var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
        var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

        this.course = {
          "datum_od": nowDate.getFullYear() + "-" + month + "-" + day,
          "datum_do": nowDate.getFullYear() + "-" + ((month + 3 > 12) ? 12 : month + 3) + "-" + day
        };
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
      var hours = (nowDate.getHours() < 10 ? '0' : '') + nowDate.getHours();
      var minutes = (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes();
      var hoursTo = (((nowDate.getHours() + 2) % 24 < 10) ? '0' : '') + (nowDate.getHours() + 2) % 24;

      this.newLesson = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "cas_od": hours + ":" + minutes,
        "cas_do": hoursTo + ":" + minutes,
        "kurz_id": this.course.id
      };
    }

    public saveCourse(course) {
      if(this.isNew) {
        this.api.createCourse(course).then((response) => {
          this.$location.path('/autoskola/'+this.drivingSchool.autoskola_id + '/kurzy/'+response.data.kurz_id);
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
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public createStudent(student) {
      this.api.createStudent(student).then((response) => {
        this.students.push(response.data);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public deleteCourse(course) {
      this.api.deleteCourse(course).then(() => {
        this.$location.path( "/autoskola/" + this.drivingSchool.autoskola_id + "/kurzy" );
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public deleteLesson(lesson) {
      this.api.deleteLesson(lesson).then(() => {
        this.lessons.remove(lesson);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public deleteStudent(student) {
      this.api.deleteStudent(student).then(() => {
        this.students.remove(student);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('CourseDetail');