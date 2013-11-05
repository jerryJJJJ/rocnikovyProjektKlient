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
      }

      $http.get("/autoskoly/"+$routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });

      alert(this.isNew);
      var nowDate = new Date();
      var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
      var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();


      this.newLesson = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
        "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
      };
    }
  }
}

app.registerController('CourseDetail');