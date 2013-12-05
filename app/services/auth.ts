
module app.service {

  export class Auth {

    public user: app.lib.IUser/* = {
      name: "user1",
      role: "jednatel"
      //role: "urednik"
    }*/;

    //TODO prihlasovaci logika

    constructor(private $rootScope:ng.IScope, private $cookieStore:ngCookies.ICookieStoreService,
                private api:app.service.Api, private $q) {
      $rootScope.auth = this;
    }

    public tryCookieLogin() {
      var login = this.$cookieStore.get('login');
      if(!login) {
        login = {userName: 'jednatel', password: 'password'};
      }
      return this.login(login.userName, login.password);
    }

    public login(userName:string, password:string) : ng.IPromise<app.lib.IUser> {
      return this.api.login(userName, password).then((user) => {
        this.$cookieStore.put('login', {
          'userName': userName,
          'password': password
        });
        console.log("Login Success!", this.$cookieStore.get('login'));
        this.user = user;
        return user;
      });
    }

    public logout() {
      this.$cookieStore.remove('login');
      location.replace("/#/");
      this.user = null;
    }

  }

}


app.registerService('Auth');