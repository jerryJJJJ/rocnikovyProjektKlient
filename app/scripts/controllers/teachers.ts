'use strict';

module app.controller {

  export class Teachers {

    public teachers:Array;


    constructor(private $http:ng.IHttpService, private auth:app.service.Auth) {
      $http.get("/ucitele").then((response:ng.IHttpPromiseCallbackArg) => {
        this.teachers = response.data.ucitele;
      }, (reason) => {
        alert('Chyba: ' + reason); 
      });
    }

  }

}

app.registerController('Teachers');