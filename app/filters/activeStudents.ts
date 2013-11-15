
module app.filter {

  export class ActiveStudents {

    public static filter(students:Array, courses:app.lib.IndexedArray) {
      return students.filter((student) => {
        var state = courses.find(student['kurz_id'])['stav'];
        return state == 'probihajici' || state == 'jde_ke_zkousce';
      });
    }

  }

}

app.registerFilter('ActiveStudents');