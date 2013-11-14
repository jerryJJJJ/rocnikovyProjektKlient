
module app.service {

  export class Api {

    private url : string = "http://ronkovprojektapi.apiary.io";


    constructor(private $http:ng.IHttpService, $rootScope:ng.IRootScopeService) {
      $rootScope.serverUrl = this.url;
    }

    public getDrivingSchool(drivingSchoolId) {
      return this.$http.get(this.url + "/autoskoly/" + drivingSchoolId);
    }

    public getDrivingSchools() {
      return this.$http.get(this.url + "/autoskoly");
    }

    public getTeachers(drivingSchoolId) {
      return this.$http.get(this.url + "/ucitele?autoskola_id=" + drivingSchoolId);
    }

    public getVehicles(drivingSchoolId) {
      return this.$http.get(this.url + "/vozidla?autoskola_id=" + drivingSchoolId);
    }

    public getVehicle(vehicleId) {
      return this.$http.get(this.url + "/vozidla/" + vehicleId);
    }

    public getCourse(courseId) {
      return this.$http.get(this.url + "/kurzy/" + courseId);
    }

    public getCourses(drivingSchoolId) {
      return this.$http.get(this.url + "/kurzy?autoskola_id=" + drivingSchoolId);
    }

    public getRides(vehicleId) {
      return this.$http.get(this.url + "/jizdy?vozidlo_id=" + vehicleId);
    }

    public getStudentRides(studentId) {
      return this.$http.get(this.url + "/jizdy?student_id=" + studentId);
    }

    public getStudentLessons(studentId) {
      return this.$http.get(this.url + "/teorie?student_id=" + studentId);
    }

    public getVehicleDocuments(vehicleId) {
      return this.$http.get(this.url + "/dumenty-vozidla?vozidlo_id=" + vehicleId);
    }

    public getLessons(courseId) {
      return this.$http.get(this.url + "/teorie?kurz_id=" + courseId);
    }

    public getStudents(courseId) {
      return this.$http.get(this.url + "/studenti?kurz_id=" + courseId);
    }

    public getStudent(studentId) {
      return this.$http.get(this.url + "/studenti/" + studentId);
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

    public createDrivingSchool(drivingSchool) {
      return this.$http.post(this.url + "/autoskoly", drivingSchool);
    }

    public createUser(user) {
      return this.$http.post(this.url + "/uzivatele", user);
    }

    public updateVehicle(vehicle) {
      return this.$http.put(this.url + "/vozidla/" + vehicle.vozidlo_id, vehicle);
    }

    public updateCourse(course) {
      return this.$http.put(this.url + "/kurzy/" + course.kurz_id, course);
    }

    public updateStudent(student) {
      return this.$http.put(this.url + "/studenti/" + student.student_id, student);
    }

    public deleteVehicle(vehicle) {
       return this.$http.delete(this.url + "/vozidla/" + vehicle.vozidlo_id);
    }

    public deleteRide(ride) {
      return this.$http.delete(this.url + "/jizdy/" + ride.jizda_id);
    }

    public deleteVehicleDocument(document) {
      return this.$http.delete(this.url + "/dokumenty-vozidla/" + document.stk_id);
    }

    public deleteCourse(course) {
      return this.$http.delete(this.url + "/kurzy/" + course.kurz_id);
    }

    public deleteLesson(lesson) {
      return this.$http.delete(this.url + "/teorie/" + lesson.teorie_id);
    }

    public deleteStudent(student) {
      return this.$http.delete(this.url + "/studenti/" + student.student_id);
    }
  }
}


app.registerService('Api');