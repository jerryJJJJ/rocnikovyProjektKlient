
module app.filter {

  export class VypisOpravneniJizdy {

    public static filter(ucitel:any) {
      return ['a', 'b', 'c', 'd', 't'].filter((letter:string) => {
        return ucitel['opravneni_jizdy_'+letter];
      }).map((letter:string) => {
         return letter.toUpperCase();
      }).join(', ');
    }

  }

}

app.registerFilter('VypisOpravneniJizdy');