'use strict';

module app.controller {

  export class Main {

    public username:string;

    public password:string;

    constructor (private $scope:ng.IScope, $rootScope, private auth:app.service.Auth, private $location:ng.ILocationService, $http:ng.IHttpService) {
      /*$http({
        method: "PATCH",
        url: $rootScope.serverUrl + "/test/10",

        // These accept multiple types, so let's define them as any
        data: {
          "aaa": "bbb"
        }
      });*/
    }

    public login() {
      this.auth.login(this.username, this.password).then((user:app.lib.IUser) =>{
        if(user.role.match("jednatel")) this.$location.path('/autoskola/'+user.autoskola_id);
        else this.$location.path('/autoskoly');
      });
    }

  }

}

app.registerController('Main');