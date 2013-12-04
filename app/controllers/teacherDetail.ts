
module app.controller {

  export class TeacherDetail {

    public isNew;

    public tab :string = "lessons"; //lessons | rides

    public static resolve : any = {
      'drivingSchool': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getDrivingSchool($route.current.params.autoskolaId).then((response) => response.data);
      },
      'teacher': (api:app.service.Api, $route:ng.IRoute) => {
        if($route.current.params.id) {
          return api.getTeacher($route.current.params.id).then((response) => {
            return response.data;
          });
        } else {
          return {};
        }
      },
      'lessons': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getTeacherLessons($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('teorie_id', response.data['teorie']);
        });
      },
      'rides': (api:app.service.Api, $route:ng.IRoute) => {
        if($route.current.params.id) {
          return api.getTeacherRides($route.current.params.id).then((response) => {
            return new app.lib.IndexedArray('jizda_id', response.data['jizdy']);
          });
        } else return new app.lib.IndexedArray('jizda_id');
      },
      'documents': (api:app.service.Api, $route:ng.IRoute) => {
        if($route.current.params.id) {
          return api.getTeacherDocuments($route.current.params.id).then((response) => {
            return new app.lib.IndexedArray('dokument_id', response.data['dokumenty']);
          });
        } else return new app.lib.IndexedArray('dokument_id');
      },
      'students': (api:app.service.Api, $route:ng.IRoute) => {
        return api.getStudents($route.current.params.autoskolaId).then((response) => {
          return new app.lib.IndexedArray('student_id', response.data['studenti']);
        });
      }
    };

    constructor(private $routeParams, private $scope, private api:app.service.Api, private $location:ng.ILocationService,
                public drivingSchool:Object, public teacher:Object, public students:app.lib.IndexedArray,
                public rides:app.lib.IndexedArray, public documents:app.lib.IndexedArray, public lessons:app.lib.IndexedArray) {

      if($routeParams.id) {
        this.isNew = false;
      } else {
        this.isNew = true;
        this.teacher = {
          pocet_deti: 0,
          hodinova_mzda: 0,
          autoskola_id: $routeParams.autoskolaId,
          opravneni_jizdy_a: false,
          opravneni_jizdy_b: false,
          opravneni_jizdy_c: false,
          opravneni_jizdy_d: false,
          opravneni_jizdy_t: false
        };
      }

    }


    public saveTeacher(ucitel) {
      if(this.isNew) {
        this.api.createTeacher(ucitel).then((response) => {
          this.teacher = response.data; this.isNew = false;
          this.$location.path("/autoskola/"+this.$routeParams.autoskolaId+"/ucitele/"+response.data.ucitel_id);
        }, (reason) => {
          alert('Chyba: ' + reason);
        });
      } else {
        this.api.updateTeacher(ucitel).then((response) => {
          this.teacher = response.data;
          this.$scope.teacherForm.$setPristine();
        }, (reason) => {
          alert("Chyba: " + reason);
        });
      }
    }


    public deleteTeacher(teacher) {
      this.api.deleteTeacher(teacher).then(() => {
        this.$location.path("/autoskola/" + this.drivingSchool.autoskola_id + "/ucitele");
      }, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteDocument(document) {
      this.api.deleteTeacherDocument(document).then(() => {
        this.documents.remove(document);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    public uploadResults(content, completed) {
      this.api.getTeacherDocuments(this.$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
        this.documents = new app.lib.IndexedArray('dokument_id', response.data.dokumenty);
      }, (reason) => {
        alert('Nepodarilo se nacist dokumenty: ' + reason);
      });
    }
  }

}

app.registerController('TeacherDetail');