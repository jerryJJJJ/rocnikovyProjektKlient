
module app.service {

  export class Auth {

    public user: app.lib.IUser = {
      name: "user1",
      //role: "jednatel"
      role: "urednik"
    };

    //TODO prihlasovaci logika

    constructor(private $rootScope:ng.IScope, private $cookieStore:ng.ICookieStoreService, private api:app.service.Api) {
      $rootScope.auth = this;
    }

    public login(userName:string, password:string) : ng.IPromise<app.lib.IUser> {
      return this.api.login(userName, password).then((user) => {
        this.user = user;
        return user;
      });
    }

    public logout() {
      location.replace("/#/");
      this.user = null;
    }

  }

}


app.registerService('Auth');