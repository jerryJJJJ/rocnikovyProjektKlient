
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

    public createLesson(lesson) {
      return this.$http.post("/teorie", lesson);
    }

    public createStudent(student) {
      return this.$http.post("/studenti", student);
    }

    public createCourse(course) {
      return this.$http.post("/kurzy", course);
    }

    public updateVehicle(vehicle) {
      return this.$http.put("/vozidla/" + vehicle.id, vehicle);
    }

    public updateCourse(course) {
      return this.$http.put("/kurzy/" + course.id, course);
    }

    public deleteVehicle(vehicle) {
       return this.$http.delete("/vozidla/" + vehicle.id);
    }

    public deleteRide(ride) {
      return this.$http.delete("/jizdy/" + ride.id);
    }

    public deleteDocument(document) {
      return this.$http.delete("/dokumenty/" + document.id);
    }

    public deleteCourse(course) {
      return this.$http.delete("/kurzy/" + course.id);
    }

    public deleteLesson(lesson) {
      return this.$http.delete("/teorie/" + lesson.id);
    }

    public deleteStudent(student) {
      return this.$http.delete("/studenti/" + student.id);
    }
  }
}


app.registerService('Api');