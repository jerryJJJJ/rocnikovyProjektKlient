'use strict';

module app.controller {

  export class Main {

    public username:string;

    public password:string;

    constructor (private $scope:ng.IScope, private auth:app.service.Auth, private $location:ng.ILocationService) {

    }

    public login() {
      this.auth.login(this.username, this.password).then((user:app.lib.IUser) =>{
        if(user.role == "jednatel") this.$location.path('/autoskola/'+user.autoskola_id);
        else this.$location.path('/autoskoly');
      });
    }

  }

}

app.registerController('Main');