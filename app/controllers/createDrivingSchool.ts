/// <reference path="../components/types/angularjs/angular.d.ts"/>
/// <reference path="../services/api.ts"/>
/// <reference path="../lib/indexedArray.ts"/>
/// <reference path="../app.ts"/>


module app.controller {

  export class CreateDrivingSchool {

    public drivingSchool;
    public user;

    constructor(private $http:ng.IHttpService, private $routeParams,
                private api:app.service.Api, private $location:ng.ILocationService) {

      this.user = {
        "uzivatelske_jmeno": "",
        "heslo": "",
        "role": "jednatel"
      }

      this.drivingSchool = {
        "nazev": "",
        "adresa_mesto": "",
        "adresa_ulice": "",
        "adresa_cp": "",
        "adresa_psc": "",
        "uzivatel_id": 0
      }
    }

    public saveDrivingSchool(drivingSchool, user) {
      this.api.createUser(user).then((response) => {
          this.drivingSchool['uzivatel_id'] = response.data['uzivatel_id'];
          this.user = response.data;
          this.api.createDrivingSchool(drivingSchool).then(() => {
            this.$location.path( "/autoskoly");
          }, (reason) => {
            this.api.deleteUser(this.user);
            alert('chyba: ' + reason);
          })
        }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('CreateDrivingSchool');