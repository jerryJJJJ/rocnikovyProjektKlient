module app.controller {

  export class VehicleDetail {

    public drivingSchool;
    public vehicle;
    public rides;
    public students;
    public teachers;
    public documents;
    public newRide;
    public isNew;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api,
                private auth, private $location:ng.ILocationService) {

      this.api.getDrivingSchool($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });

      if($routeParams.id) {
        this.isNew = false;
        this.api.getVehicle($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.vehicle = response.data;
        }, (reason) => {
          alert('Nepodarilo se nacist vozidlo: ' + reason);
        });

        this.api.getRides($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.rides = new app.lib.IndexedArray('jizda_id', response.data.jizdy);
        }, (reason) => {
          alert('Nepodarilo se nacist jizdy: ' + reason);
        });

        this.api.getVehicleDocuments($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.documents = new app.lib.IndexedArray('stk_id', response.data.dokumenty);
        }, (reason) => {
          alert('Nepodarilo se nacist dokumenty: ' + reason);
        });

        this.api.getStudents($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.students = new app.lib.IndexedArray('student_id', response.data.studenti);
        }, (reason) => {
          alert('Nepodarilo se nacist studenty: ' + reason);
        });

        this.api.getTeachers($routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
          this.teachers =  new app.lib.IndexedArray('ucitel_id', response.data.ucitele);
        }, (reason) => {
          alert('Nepodarilo se nacist ucitele: ' + reason);
        });

      } else {
        this.isNew = true;
        this.vehicle = {
          "pocatecni-stav-km": 0,
          "prumerna-spotreba": 0,
          "pocet-km": 0
        };
      }
      var nowDate = new Date();
      var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
      var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();


      this.newRide = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
        "do": (((nowDate.getHours() + 2 > 23) ? 23 : nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
      };
    }

    public saveVehicle(vehicle) {
      if(this.isNew) {
        this.api.createVehicle(vehicle).then((response) => {
          this.vehicle = response.data; this.isNew = false;
        }, (reason) => {
          alert('Chyba: ' + reason);
        });
      } else {
        this.api.updateVehicle(vehicle).then((response) => {
          this.vehicle = response.data;
        }, (reason) => {
          alert("Chyba: " + reason);
        });
      }
    }

    public createRide(ride) {
      this.api.createRide(ride).then((response) => {
        this.rides.push(response.data);
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
      if (completed && content.length > 0) {
        this.api.getVehicleDocuments($routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.documents = new app.lib.IndexedArray('stk_id', response.data.dokumenty);
        }, (reason) => {
          alert('Nepodarilo se nacist dokumenty: ' + reason);
        });
      } else {
        // 1. ignore content and adjust your model to show/hide UI snippets; or
        // 2. show content as an _operation progress_ information
      }
    }
  }

}

app.registerController('VehicleDetail');