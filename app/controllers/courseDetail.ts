module app.controller {

  export class CourseDetail {

    public course

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api, private auth) {

      $http.get("/kurzy/"+$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.course = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist kurz: ' + reason);
      });
    }
  }
}

app.registerController('CourseDetail');