
module app.service {

  export class Auth {

    public user: app.lib.IUser;

    //TODO prihlasovaci logika

    constructor(private $rootScope:ng.IScope, private $cookies:ng.ICookiesService) {
      $rootScope.auth = this;
    }

  }

}


app.registerService('Auth');