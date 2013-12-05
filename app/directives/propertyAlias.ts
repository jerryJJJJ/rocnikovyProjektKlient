
module app.directive {

  export class PropertyAlias {

    public restrict = "A";

    public link(scope:ng.IScope, iElement:JQuery, attrs:ng.IAttributes) {

      var oldValue;

      scope.$watchCollection(attrs['propertyAlias'], (value?:any) => {
        //odmazeme vsechny predchozi hodnoty
        if(oldValue) {
          for(var prop in oldValue) {
            if(oldValue.hasOwnProperty(prop)) {
              delete scope[prop];
            }
          }
        }

        //zkopirujeme nove hodnoty
        if(value) {
          for(var prop in value) {
            if(value.hasOwnProperty(prop)) {
              scope[prop] = value[prop];
            }
          }
        }

        //ulozime novou hodnotu
        oldValue = value;
      });
    }

  }

}

app.registerDirective('PropertyAlias');