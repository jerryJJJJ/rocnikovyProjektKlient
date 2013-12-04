
module app.service {

  export class Api {

    private url : string = "http://ronkovprojektapi.apiary.io";
    //private url : string = "http://localhost:49684/api";


    constructor(private $http:ng.IHttpService, $rootScope:ng.IRootScopeService,  private $q:ng.IQService) {
      $rootScope.serverUrl = this.url;
    }

    private treatVozidlo(vozidlo:Object) {
      this.trimDate(vozidlo, 'posledni_stk');
    }

    private treatUcitel(ucitel:Object) {
      this.trimDate(ucitel, 'platnost_opravneni');
      this.trimDate(ucitel, 'posledni_prohlidka');
    }

    private treatJizda(jizda:Object) {
      jizda['datum'] = jizda['cas_od'].slice(0,10);
      this.trimHours(jizda, 'cas_od');
      this.trimHours(jizda, 'cas_do');
    }

    private treatDokument(dokument:Object) {
      this.trimDate(dokument, 'datum_vlozeni');
    }

    private treatTeorie(teorie:Object) {
      teorie['datum'] = teorie['cas_od'].slice(0,10);
      this.trimHours(teorie, 'cas_od');
      this.trimHours(teorie, 'cas_do');
    }

    private treatTeorieSave(teorie:Object) {
      teorie.cas_od = teorie.datum+" "+(teorie.cas_od.length == 4 ? '0' : '') + teorie.cas_od;
      teorie.cas_do = teorie.datum+" "+(teorie.cas_do.length == 4 ? '0' : '') + teorie.cas_do;
    }

    private treatRideSave(ride:Object) {
      ride.cas_od = ride.datum+" "+(ride.cas_od.length == 4 ? '0' : '') + ride.cas_od;
      ride.cas_do = ride.datum+" "+(ride.cas_do.length == 4 ? '0' : '') + ride.cas_do;
    }

    private treatKurz(kurz:Object) {
      this.trimDate(kurz, 'datum_od');
      this.trimDate(kurz, 'datum_do');
    }

    private trimDate(entity:Object, prop:string) {
      if(typeof entity[prop] == "string") {
        entity[prop] = entity[prop].slice(0,10);
      }
    }

    private trimHours(entity:Object, prop:string) {
      if(typeof entity[prop] == "string") {
        entity[prop] = entity[prop].slice(11,16);
      }
    }

    public login(userName, password):ng.IPromise<app.lib.IUser> {
      var deferred = this.$q.defer();
      deferred.resolve({
        name: userName,
        role: userName
      });
      return deferred.promise;
    }

    public getDrivingSchool(drivingSchoolId) {
      return this.$http.get(this.url + "/autoskoly/" + drivingSchoolId);
    }

    public getDrivingSchools() {
      return this.$http.get(this.url + "/autoskoly");
    }

    public getTeachers(drivingSchoolId) {
      return this.$http.get(this.url + "/ucitele?autoskola_id=" + drivingSchoolId).then((response) => {
        response.data.ucitele.forEach((ucitel) => this.treatUcitel(ucitel));
        return response;
      });
    }

    public getTeacher(teacherId) {
      return this.$http.get(this.url + "/ucitele/" + teacherId).then((response) => {
        this.treatUcitel(response.data);
        return response;
      });
    }

    public getVehicles(drivingSchoolId) {
      return this.$http.get(this.url + "/vozidla?autoskola_id=" + drivingSchoolId).then((response) => {
        response.data.vozidla.forEach((vozidlo) => this.treatVozidlo(vozidlo));
        return response;
      });
    }

    public getVehicle(vehicleId) {
      return this.$http.get(this.url + "/vozidla/" + vehicleId).then((response) => {
        this.treatVozidlo(response.data);
        return response;
      });
    }

    public getCourse(courseId) {
      return this.$http.get(this.url + "/kurzy/" + courseId).then((response) => {
        this.treatKurz(response.data);
        return response;
      });
    }

    public getCourses(drivingSchoolId) {
      return this.$http.get(this.url + "/kurzy?autoskola_id=" + drivingSchoolId).then((response) => {
        response.data.kurzy.forEach((kurz) => this.treatKurz(kurz));
        return response;
      });
    }

    public getVehicleRides(vehicleId) {
      return this.$http.get(this.url + "/jizdy?vozidlo_id=" + vehicleId).then((response) => {
        response.data.jizdy.forEach((jidza) => this.treatJizda(jidza));
        return response;
      });
    }

    public getStudentRides(studentId) {
      return this.$http.get(this.url + "/jizdy?student_id=" + studentId).then((response) => {
        response.data.jizdy.forEach((jidza) => this.treatJizda(jidza));
        return response;
      });
    }

    public getTeacherRides(teacherId) {
      return this.$http.get(this.url + "/jizdy?teacher_id=" + teacherId).then((response) => {
        response.data.jizdy.forEach((jidza) => this.treatJizda(jidza));
        return response;
      });
    }

    public getTeacherLessons(teacherId) {
      return this.$http.get(this.url + "/teorie?ucitel_id=" + teacherId).then((response) => {
        response.data.teorie.forEach((teorie) => this.treatTeorie(teorie));
        return response;
      });
    }

    public getVehicleDocuments(vehicleId) {
      return this.$http.get(this.url + "/dokumentyvozidla?vozidlo_id=" + vehicleId).then((response) => {
        response.data.dokumenty.forEach((dokument) => this.treatDokument(dokument));
        return response;
      });
    }

    public getTeacherDocuments(teacherId) {
      return this.$http.get(this.url + "/dokumentyucitele?ucitel_id=" + teacherId).then((response) => {
        response.data.dokumenty.forEach((dokument) => this.treatDokument(dokument));
        return response;
      });
    }

    public getLessons(courseId) {
      return this.$http.get(this.url + "/teorie?kurz_id=" + courseId).then((response) => {
        response.data.teorie.forEach((teorie) => this.treatTeorie(teorie));
        return response;
      });
    }

    public getStudents(autoskolaId) {
      return this.$http.get(this.url + "/studenti?autoskola_id=" + autoskolaId);
    }

    public getStudent(studentId) {
      return this.$http.get(this.url + "/studenti/" + studentId);
    }

    public createVehicle(vehicle) {
      return this.$http.post(this.url + "/vozidla", vehicle);
    }

    public createTeacher(teacher) {
      return this.$http.post(this.url + "/ucitele", teacher);
    }

    public createRide(ride) {
      this.treatRideSave(ride);
      return this.$http.post(this.url + "/jizdy", ride).then((response) => {
        this.treatJizda(response.data);
        return response;
      });
    }

    public createLesson(lesson) {
      this.treatTeorieSave(lesson);
      return this.$http.post(this.url + "/teorie", lesson).then((response) => {
        this.treatTeorie(response.data);
        return response;
      });
    }

    public createStudent(student) {
      return this.$http.post(this.url + "/studenti", student);
    }

    public createCourse(course) {
      return this.$http.post(this.url + "/kurzy", course).then((response) => {
        this.treatKurz(response.data);
        return response;
      });
    }

    public createDrivingSchool(drivingSchool) {
      return this.$http.post(this.url + "/autoskoly", drivingSchool);
    }

    public createUser(user) {
      return this.$http.post(this.url + "/uzivatele", user);
    }

    public updateVehicle(vehicle) {
      return this.$http.put(this.url + "/vozidla/" + vehicle.vozidlo_id, vehicle).then((response) => {
        this.treatVozidlo(response.data);
        return response;
      });
    }

    public updateTeacher(teacher) {
      return this.$http.put(this.url + "/ucitele/" + teacher.ucitel_id, teacher).then((response) => {
        this.treatUcitel(response.data);
        return response;
      });
    }

    public updateCourse(course) {
      return this.$http.put(this.url + "/kurzy/" + course.kurz_id, course).then((response) => {
        this.treatKurz(response.data);
        return response;
      });
    }

    public updateStudent(student) {
      return this.$http.put(this.url + "/studenti/" + student.student_id, student);
    }

    public deleteVehicle(vehicle) {
       return this.$http.delete(this.url + "/vozidla/" + vehicle.vozidlo_id);
    }

    public deleteTeacher(teacher) {
       return this.$http.delete(this.url + "/ucitele/" + teacher.ucitel_id);
    }

    public deleteRide(ride) {
      return this.$http.delete(this.url + "/jizdy/" + ride.jizda_id);
    }

    public deleteVehicleDocument(document) {
      return this.$http.delete(this.url + "/dokumentyvozidla/" + document.dokument_id);
    }

    public deleteTeacherDocument(document) {
      return this.$http.delete(this.url + "/dokumentyucitele/" + document.dokument_id);
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

    public deleteUser(user) {
      return this.$http.delete(this.url + "/uzivatele/", user.uzivatel_id);
    }
  }
}


app.registerService('Api');