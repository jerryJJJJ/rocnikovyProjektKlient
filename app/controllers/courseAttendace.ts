module app.controller {

  export class CourseAttendance {

    public static resolve : any = {
      'drivingSchool': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getDrivingSchool($route.current.params.autoskolaId).then((response) => response.data);
      },
      'course': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getCourse($route.current.params.kurzId).then((response) => response.data);
      },
      'students': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getStudents($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('student_id', response.data['studenti'].filter((student) => {
            return student.kurz_id == $route.current.params.kurzId; //vyfiltrujeme ze vsech studentu jen ty co patri do
            //naseho kurzu
          }));
        });
      },
      'teachers': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getTeachers($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
        });
      },
      'lesson': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getLessons($route.current.params.kurzId).then((response) => {
          var indexed = new app.lib.IndexedArray('teorie_id', response.data['teorie']);
          return indexed.find($route.current.params.id);
        });
      },
      'attendance': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getLessonAttendance($route.current.params.id).then((response) => {
          return CourseAttendance.attendanceToObject(response.data);
        });
      }
    };

    private static attendanceToObject(attendance:Array<number>) {
      var obj = {};
      attendance.forEach((id) => obj[id] = true);
      return obj;
    }

    private static objectToAttendance(object:Array<number>) {
      var attendance = [];
      for(var prop in object) {
        if(object.hasOwnProperty(prop) && object[prop]) {
          attendance.push(parseInt(prop));
        }
      }
      return attendance;
    }

    constructor(private $routeParams, private api:app.service.Api, private $location:ng.ILocationService,
                public drivingSchool:Object, private $scope, public course:Object, public students:app.lib.IndexedArray,
                public teachers:app.lib.IndexedArray, public lesson:any, public attendance) {
    }

    public saveAttendance() {
      this.api.updateLessonAttendance(this.lesson.teorie_id, CourseAttendance.objectToAttendance(this.attendance)).error((reason) => {
        alert('Chyba: ' + reason);
      });
      this.$scope.attendanceForm.$setPristine();
    }

    public deleteLesson(lesson) {
      this.api.deleteLesson(lesson).then(() => {
        this.$location.path('/autoskola/' + this.drivingSchool.autoskola_id + '/kurzy/' + this.course.kurz_id);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

  }
}

app.registerController('CourseAttendance');