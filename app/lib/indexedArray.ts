
module app.lib {

  export class IndexedArray<T extends IIndexable> extends Array<T> {

    /**
     * obsah kolekce podle idcek
     * @type {{}}
     */
    private index:{};

    public length:number;

    /**
     *
     * @param extend {function} - funkce pro extendovani objektu
     */
    constructor(private prop:string = "id", values?:Array<T>) {
      this.index = {};
      this.length = 0;
      if (values) {
        this.pushArray(values);
      }
    }

    /**
     * navrati entitu, nebo "null"
     * @param id
     * @returns {*}
     */
    public find(id:string):T {
      if (this.containsId(id)) {
        return this.index[id];
      }
      return null;
    }

    /**
     * Odstrani entitu
     * @param entity
     * @return number - nova delka pole
     */
    public remove(...items:T[]) : number;
    public remove() : number {
      for (var i = arguments.length - 1; i >= 0; i--) {
        if (!!this.index[arguments[i][this.prop]]) {
          if ((index = this.indexOf(arguments[i])) > -1) {
            Array.prototype.splice.call(this, index, 1);
          }
          delete this.index[arguments[i][this.prop]];
        }
      }
      return this.length;
    }

    public removeArray(items:IndexedArray<T>) : number;
    public removeArray(items:Array<T>) : number {
      return this.remove.apply(this, Array.prototype.slice.call(items, 0));
    }

    /**
     * Odstrani entitu pricemz staci znat jen jeji ID
     * @param entity
     * @return number - nova delka pole
     */
    public removeId(...ids:string[]) : number;
    public removeId() : number {
      for (var i = arguments.length - 1; i >= 0; i--) {
        if (!!this.index[arguments[i]]) {
          if ((index = goog.array.findIndex(this, (item:IIndexable) => {
            return item[this.prop] === arguments[i];
          })) > -1) {
            Array.prototype.splice.call(this, index, 1);
          }
          delete this.index[arguments[i]];
        }
      }
      return this.length;
    }

    public removeIdArray(ids:Array<string>) : number {
      return this.removeId.apply(this, Array.prototype.slice.call(ids, 0));
    }

    public removeIf(callback:(item:T) => bool) {
      for (var i = this.length - 1; i >= 0; i--) {
        if(callback.call(null, this[i])) {
          var item = Array.prototype.splice.call(this, i, 1)[0];
          delete this.index[item[this.prop]];
        }
      }
    }

    /**
     * Vrati prvky v urcitem rozsahu
     * @param start
     * @param end
     * @returns {app.lib.IndexedArray} oindexovany rozsah
     */
    public sliceIndexed(start:number, end?:number):IndexedArray<T> {
      var newArray = new IndexedArray();
      var items = Array.prototype.slice.call(this, start, end);
      newArray.push.apply(newArray, items);
      return newArray;
    }

    /**
     * Vrati prvky v urcitem rozsahu
     * @param start
     * @param end
     * @returns {app.lib.IndexedArray} oindexovany rozsah
     */
    public slice(start:number, end?:number):T[] {

      if(typeof end === "undefined") {
        return Array.prototype.slice.call(this, start);
      } else {
        return Array.prototype.slice.call(this, start, end);
      }
    }

    /**
     *
     * @param index
     * @param howMany
     * @param items
     */
    public spliceIndexed(index:number, howMany:number, ...items:T[]) : app.lib.IndexedArray<T>;
    public spliceIndexed() : app.lib.IndexedArray<T> {
      throw "Not implemented yet!";
    }

    /**
     *
     * @param index
     * @param howMany
     * @param items
     */
    public splice(index:number, howMany:number, ...items:T[]) : T[];
    public splice() : T[] {
      var toAdd = Array.prototype.slice.call(arguments, 2); //elementy k pridani

      //odebereme elementy z pozice
      var removed = Array.prototype.splice.call(this, arguments[0], arguments[1]);
      for (var i = removed.length - 1; i >= 0; i--) { // odindexujeme odebrane
        delete this.index[removed[i][this.prop]];
      }

      //zaindexujeme pridavane a zkontrolujeme unikatnost
      if(toAdd.length) {
        for (var i = toAdd.length - 1; i >= 0; i--) {
          if(!this.index[toAdd[i][this.prop]]) {
            this.index[toAdd[i][this.prop]] = toAdd[i];
          } else {
            toAdd.splice(i, 1);
          }
        }
        toAdd.unshift(arguments[0], 0);
        Array.prototype.splice.apply(this, toAdd);

        //ty z odebranych, ktere se znovu pridali NEvracime jako odebrane
        for (var i = removed.length - 1; i >= 0; i--) {
          if(!!this.index[removed[i][this.prop]]) {
            removed.splice(i, 1);
          }
        }
      }

      return removed;
    }

    public spliceArrayIndexed(index:number, howMany:number, items:T[]) : app.lib.IndexedArray<T> {
      return this.spliceIndexed.call(this, index, howMany, Array.prototype.slice(items, 0));
    }

    public spliceArray(index:number, howMany:number, items:T[]) : T[] {
      return this.splice.call(this, index, howMany, Array.prototype.slice(items, 0));
    }

    /**
     * Vyjme prvni prvek
     */
    public shift() : T {
      var element = Array.prototype.shift.call(this);
      delete this.index[element[this.prop]];
      return element;
    }

    public unshift(...items:T[]) : number;
    public unshift() : number {
      var args = Array.prototype.slice.call(arguments, 0);
      for (var i = args.length - 1; i >= 0; i--) {
        if(!!this.index[args[i][this.prop]]) {
          args.splice(i, 1);
        } else {
          this.index[args[i][this.prop]] = args[i];
        }
      }
      return Array.prototype.unshift.apply(this, args);
    }

    public unshiftArray(items:app.lib.IndexedArray<T>) : number;
    public unshiftArray(items:T[]) : number {
      return this.unshift.apply(this, Array.prototype.slice.call(items, 0));
    }

    public clear() {
      this.splice(0, this.length);
    }

    public pop() : T {
      var item:T = Array.prototype.pop.call(this);
      delete this.index[item[this.prop]];
      return item;
    }

    public push(...args:T[]) : number;
    public push() : number {
      if (arguments.length) {
        var elements = Array.prototype.slice.call(arguments, 0);
        for (var i = elements.length - 1; i >= 0; i--) {
          if(!this.index[elements[i][this.prop]]) {
            this.index[elements[i][this.prop]] = arguments[i];
          } else {
            elements.splice(i, 1);
          }
        }
        Array.prototype.push.apply(this, elements);
      }
      return this.length;
    }

    public pushArray(items:Array<T>);
    public pushArray(items:IndexedArray<T>) {
      return this.push.apply(this, Array.prototype.slice.call(items, 0));
    }

    public map(callback:(item, i?, array?) => any, thisp?) : Array {
      return Array.prototype.map.call(this, callback, thisp);
    }

    public filterIndexed(callbackfn: (value: T, index: number, array: app.lib.IndexedArray<T>) => boolean, thisArg?: any): app.lib.IndexedArray<T>;
    public filterIndexed(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): app.lib.IndexedArray<T> {
      var filtered = this.filter(callbackfn, thisArg);
      var indexed = new app.lib.IndexedArray();
      indexed.pushArray(filtered);
      return indexed;
    }

    public concat(arr2:IndexedArray, ...args:IndexedArray[]):T[];
    public concat(arr2:Array, ...args:Array[]):T[];
    public concat():T[] {
      var indexed = this.concatIndexed.apply(this, Array.prototype.slice.call(arguments, 0));
      return indexed.toArray();
    }

    public concatIndexed(arr2:IndexedArray, ...args:IndexedArray[]):IndexedArray<T>;
    public concatIndexed():IndexedArray<T> {
      var newArray = new app.lib.IndexedArray();
      Array.prototype.unshift.call(arguments, this); //pridame sebe na zacatek pole
      for (var i = 0; i < arguments.length; i++) {
        newArray.push.apply(newArray, Array.prototype.slice.call(arguments[i], 0)); //nemusi byt pole, ale indexedArray!
      }
      return newArray;
    }

    public toArray() : T[] {
      return Array.prototype.slice.call(this, 0, this.length);
    }

    public toIndexedArray() : app.lib.IndexedArray<T> {
      var copy = new app.lib.IndexedArray();
      copy.push.apply(copy, this.toArray());
      return copy;
    }

    public forEach(callbackfn: (value: T, index: number, array: T[]) => void , thisArg?: any): void;
    public forEach(callbackfn: (value: T) => void): void {
      Array.prototype.forEach.apply(this, Array.prototype.slice.call(arguments, 0));
    }

    public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    public map<U>(callbackfn: (value: T) => U): U[] {
      return Array.prototype.map.apply(this, Array.prototype.slice.call(arguments, 0));
    }

    /**
     * Zjisteni, zda kolekce obsahuje entitu s danym ID
     * @param id
     * @returns {boolean}
     */
    public containsId(id:number) : bool;
    public containsId(id:string) : bool {
      return !!this.index[id];
    }

    //public sort(compareFn?: (a: T, b: T) => number): T[];

    /**
     * Zjisteni, zda kolekce obsahuje entitu
     * @param id
     * @returns {boolean}
     */
    public contains(entity: T) : bool {
      return !!this.index[entity[this.prop]];
    }

    public indexOf(entity: T, fromIndex?:number) : number {
      if(!this.index[entity[this.prop]]) {
        return -1;
      }
      return Array.prototype.indexOf.apply(this, Array.prototype.slice.call(arguments, 0));
    }

  }

  IndexedArray.prototype.constructor = [].constructor;
  IndexedArray.prototype.callee = function() {}; // HACK for angularJS 1.1.5


  export interface IIndexable {
    id : string;
  }

}