
module app.controller {

  export class VehicleDetail {

    public newRide;
    public isNew;

    public static resolve : any = {
      'drivingSchool': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getDrivingSchool($route.current.params.autoskolaId).then((response) => response.data);
      },
      'vehicle': (api:app.service.Api, $route:ng.IRoute) => {
        if($route.current.params.id) {
          return api.getVehicle($route.current.params.id).then((response) => {
            return response.data;
          });
        } else {
          return {};
        }
      },
      'students': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getStudents($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('student_id', response.data['studenti']);
        });
      },
      'courses': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getCourses($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('kurz_id', response.data['kurzy']);
        });
      },
      'teachers': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getTeachers($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
        });
      },
      'rides': (api:app.service.Api, $route:ng.IRoute) => {
        if($route.current.params.id) {
          return api.getVehicleRides($route.current.params.id).then((response) => {
            return new app.lib.IndexedArray('jizda_id', response.data['jizdy']);
          });
        } else return new app.lib.IndexedArray('jizda_id');
      },
      'documents': (api:app.service.Api, $route:ng.IRoute) => {
        if($route.current.params.id) {
          return api.getVehicleDocuments($route.current.params.id).then((response) => {
            return new app.lib.IndexedArray('dokument_id', response.data['dokumenty']);
          });
        } else return new app.lib.IndexedArray('dokument_id');
      }
    };

    constructor(private $http:ng.IHttpService, private $routeParams, private auth:app.service.Auth, private $scope,
                private api:app.service.Api, private $location:ng.ILocationService, public drivingSchool:Object,
                public vehicle:Object, public students:app.lib.IndexedArray,  public teachers:app.lib.IndexedArray,
                public rides:app.lib.IndexedArray, public documents:app.lib.IndexedArray, public courses:app.lib.IndexedArray) {

      if($routeParams.id) {
        this.isNew = false;
      } else {
        this.isNew = true;
        this.vehicle = {
          "pocatecni-stav-km": 0,
          "prumerna-spotreba": 0,
          "pocet-km": 0,
          "autoskola_id": $routeParams.autoskolaId
        };
      }

      this.initNewRide();

    }

    private initNewRide() {
      var nowDate = new Date();
      var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
      var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

      var hours = (nowDate.getHours() < 10 ? '0' : '') + nowDate.getHours();
      var hours2 = (nowDate.getHours() + 2 > 23) ? 23 : ((nowDate.getHours() + 2 < 10 ? '0' : '') + (nowDate.getHours() + 2));
      var minutes = (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes();

      this.newRide = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "vozidlo_id": this.$routeParams.id,
        "cas_od": ""+(hours + ":" + minutes),
        "cas_do": ""+(hours2 + ":" + minutes)
      };
    }

    public saveVehicle(vehicle) {
      if(this.isNew) {
        this.api.createVehicle(vehicle).then((response) => {
          this.vehicle = response.data; this.isNew = false;
          this.$location.path("/autoskola/"+this.$routeParams.autoskolaId+"/vozidla/"+response.data.vozidlo_id);
        }, (reason) => {
          alert('Chyba: ' + reason);
        });
      } else {
        this.api.updateVehicle(vehicle).then((response) => {
          this.vehicle = response.data;
          this.$scope.vehicleForm.$setPristine();
        }, (reason) => {
          alert("Chyba: " + reason);
        });
      }
    }

    public createRide(ride) {
      ride.kurz_id = this.students.find(ride.student_id).kurz_id;
      this.api.createRide(ride).then((response) => {
        this.rides.push(response.data);
        this.initNewRide();
        if(this.$scope.vehicleForm.$pristine) {
          this.api.getVehicle(this.$routeParams.id).then((response) => this.vehicle = response.data);
        }

      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public deleteVehicle(vehicle) {
      this.api.deleteVehicle(vehicle).then(() => {
        this.$location.path("/autoskola/" + this.drivingSchool.autoskola_id + "/vozidla");
      }, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteRide(ride) {
      this.api.deleteRide(ride).then(() => {
        this.rides.remove(ride);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public deleteDocument(document) {
      this.api.deleteVehicleDocument(document).then(() => {
        this.documents.remove(document);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public uploadResults(content, completed) {
      this.api.getVehicleDocuments(this.$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.documents = new app.lib.IndexedArray('dokument_id', response.data.dokumenty);
      }, (reason) => {
        alert('Nepodarilo se nacist dokumenty: ' + reason);
      });
    }
  }

}

app.registerController('VehicleDetail');