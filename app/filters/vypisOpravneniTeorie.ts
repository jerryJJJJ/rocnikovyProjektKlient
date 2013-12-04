
module app.filter {

  export class VypisOpravneniTeorie {

    public static filter(ucitel:any) {
      var result = [];
      var opravneni = {
        'pravidla': 'pravidla silničního provozu',
        'zdravoveda': 'zdravověda',
        'udrzba': 'údržba'
      };
      for (var prop in opravneni) {
        if(ucitel['opravneni_' + prop]) {
          result.push(opravneni[prop]);
        }
      }
      return result.join(', ');
    }

  }

}

app.registerFilter('VypisOpravneniTeorie');