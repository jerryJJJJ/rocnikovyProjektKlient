
module app.service {

  export class Api {

    private url : string = "http://ronkovprojektapi.apiary.io";


    constructor(private $http:ng.IHttpService) {

    }

    public createVehicle(vehicle) {
      return this.$http.post(this.url + "/vozidla", vehicle);
    }

    public createRide(ride) {
      return this.$http.post(this.url + "/jizdy", ride);
    }

    public createLesson(lesson) {
      return this.$http.post(this.url + "/teorie", lesson);
    }

    public createStudent(student) {
      return this.$http.post(this.url + "/studenti", student);
    }

    public createCourse(course) {
      return this.$http.post(this.url + "/kurzy", course);
    }

    public updateVehicle(vehicle) {
      return this.$http.put(this.url + "/vozidla/" + vehicle.id, vehicle);
    }

    public updateCourse(course) {
      return this.$http.put(this.url + "/kurzy/" + course.id, course);
    }

    public deleteVehicle(vehicle) {
       return this.$http.delete(this.url + "/vozidla/" + vehicle.id);
    }

    public deleteRide(ride) {
      return this.$http.delete(this.url + "/jizdy/" + ride.id);
    }

    public deleteDocument(document) {
      return this.$http.delete(this.url + "/dokumenty/" + document.id);
    }

    public deleteCourse(course) {
      return this.$http.delete(this.url + "/kurzy/" + course.id);
    }

    public deleteLesson(lesson) {
      return this.$http.delete(this.url + "/teorie/" + lesson.id);
    }

    public deleteStudent(student) {
      return this.$http.delete(this.url + "/studenti/" + student.id);
    }
  }
}


app.registerService('Api');