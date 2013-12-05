
module app.controller {

  export class Settings {

    public static resolve : any = {
      'drivingSchool': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getDrivingSchool($route.current.params.id).then((response) => response.data);
      }
    };

    constructor(private api:app.service.Api, public drivingSchool, public $location:ng.ILocationService) {

    }

    public uploadResults() {
      this.$location.path("/autoskola/"+this.drivingSchool.autoskola_id);
    }
  }

}

app.registerController('Settings');