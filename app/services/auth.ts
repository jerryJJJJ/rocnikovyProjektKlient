
module app.service {

  export class Auth {

    public user: app.lib.IUser = {
      name: "user1",
      role: "jednatel"
    };

    //TODO prihlasovaci logika

    constructor(private $rootScope:ng.IScope, private $cookieStore:ng.ICookieStoreService) {
      $rootScope.auth = this;
    }

    public login(role:string) {
      this.user = {
        name: "user1",
        role: role
      };
    }

    public logout() {
      this.user = null;
    }

  }

}


app.registerService('Auth');