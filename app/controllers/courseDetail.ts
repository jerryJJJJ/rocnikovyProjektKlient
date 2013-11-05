module app.controller {

  export class CourseDetail {

    public course;
    public newLesson;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api, private auth) {

      $http.get("/kurzy/"+$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.course = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist kurz: ' + reason);
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
  }
}

app.registerController('CourseDetail');