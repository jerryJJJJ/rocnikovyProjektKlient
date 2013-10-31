
module app.service {

  export class Api {

    constructor(private $http:ng.IHttpService) {

    }

    public createVehicle(vehicle) {
      return this.$http.post("/vozidla", vehicle);
    }

    public createRide(ride) {
      return this.$http.post("/jizdy", ride);
    }

    public updateVehicle(vehicle) {
      return this.$http.put("/vozidla/" + vehicle.id, vehicle);
    }

    public deleteVehicle(vehicle) {
       return this.$http.delete("/vozidla/" + vehicle.id);
    }

    public deleteRide(ride) {
      return this.$http.delete("/jizdy/" + ride.id);
    }

    public deleteDocument(vehicle, document) {
      return this.$http.delete("/vozidla/" + vehicle.id + "/dokumenty/" + document.id);
    }
  }
}


app.registerService('Api');