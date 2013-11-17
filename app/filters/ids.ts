
module app.filter {

  export class Ids {

    public static filter(entities:Array, id_property) {
      return entities.map((entity) => entity[id_property]);
    }

  }

}

app.registerFilter('Ids');