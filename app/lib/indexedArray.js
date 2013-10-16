var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    (function (lib) {
        var IndexedArray = (function (_super) {
            __extends(IndexedArray, _super);
            function IndexedArray() {
                this.index = {};
                this.length = 0;
                if (arguments.length) {
                    this.pushArray(arguments);
                }
            }
            /**
            * navrati entitu, nebo "null"
            * @param id
            * @returns {*}
            */
            IndexedArray.prototype.find = function (id) {
                if (this.containsId(id)) {
                    return this.index[id];
                }
                return null;
            };

            IndexedArray.prototype.remove = function () {
                for (var i = arguments.length - 1; i >= 0; i--) {
                    if (!!this.index[arguments[i].id]) {
                        if ((index = this.indexOf(arguments[i])) > -1) {
                            Array.prototype.splice.call(this, index, 1);
                        }
                        delete this.index[arguments[i].id];
                    }
                }
                return this.length;
            };

            IndexedArray.prototype.removeArray = function (items) {
                return this.remove.apply(this, Array.prototype.slice.call(items, 0));
            };

            IndexedArray.prototype.removeId = function () {
                for (var i = arguments.length - 1; i >= 0; i--) {
                    if (!!this.index[arguments[i]]) {
                        if ((index = goog.array.findIndex(this, function (item) {
                            return item.id === arguments[i];
                        })) > -1) {
                            Array.prototype.splice.call(this, index, 1);
                        }
                        delete this.index[arguments[i]];
                    }
                }
                return this.length;
            };

            IndexedArray.prototype.removeIdArray = function (ids) {
                return this.removeId.apply(this, Array.prototype.slice.call(ids, 0));
            };

            IndexedArray.prototype.removeIf = function (callback) {
                for (var i = this.length - 1; i >= 0; i--) {
                    if (callback.call(null, this[i])) {
                        var item = Array.prototype.splice.call(this, i, 1)[0];
                        delete this.index[item.id];
                    }
                }
            };

            /**
            * Vrati prvky v urcitem rozsahu
            * @param start
            * @param end
            * @returns {app.lib.IndexedArray} oindexovany rozsah
            */
            IndexedArray.prototype.sliceIndexed = function (start, end) {
                var newArray = new IndexedArray();
                var items = Array.prototype.slice.call(this, start, end);
                newArray.push.apply(newArray, items);
                return newArray;
            };

            /**
            * Vrati prvky v urcitem rozsahu
            * @param start
            * @param end
            * @returns {app.lib.IndexedArray} oindexovany rozsah
            */
            IndexedArray.prototype.slice = function (start, end) {
                if (typeof end === "undefined") {
                    return Array.prototype.slice.call(this, start);
                } else {
                    return Array.prototype.slice.call(this, start, end);
                }
            };

            IndexedArray.prototype.spliceIndexed = function () {
                throw "Not implemented yet!";
            };

            IndexedArray.prototype.splice = function () {
                var toAdd = Array.prototype.slice.call(arguments, 2);

                //odebereme elementy z pozice
                var removed = Array.prototype.splice.call(this, arguments[0], arguments[1]);
                for (var i = removed.length - 1; i >= 0; i--) {
                    delete this.index[removed[i].id];
                }

                if (toAdd.length) {
                    for (var i = toAdd.length - 1; i >= 0; i--) {
                        if (!this.index[toAdd[i].id]) {
                            this.index[toAdd[i].id] = toAdd[i];
                        } else {
                            toAdd.splice(i, 1);
                        }
                    }
                    toAdd.unshift(arguments[0], 0);
                    Array.prototype.splice.apply(this, toAdd);

                    for (var i = removed.length - 1; i >= 0; i--) {
                        if (!!this.index[removed[i].id]) {
                            removed.splice(i, 1);
                        }
                    }
                }

                return removed;
            };

            IndexedArray.prototype.spliceArrayIndexed = function (index, howMany, items) {
                return this.spliceIndexed.call(this, index, howMany, Array.prototype.slice(items, 0));
            };

            IndexedArray.prototype.spliceArray = function (index, howMany, items) {
                return this.splice.call(this, index, howMany, Array.prototype.slice(items, 0));
            };

            /**
            * Vyjme prvni prvek
            */
            IndexedArray.prototype.shift = function () {
                var element = Array.prototype.shift.call(this);
                delete this.index[element.id];
                return element;
            };

            IndexedArray.prototype.unshift = function () {
                var args = Array.prototype.slice.call(arguments, 0);
                for (var i = args.length - 1; i >= 0; i--) {
                    if (!!this.index[args[i].id]) {
                        args.splice(i, 1);
                    } else {
                        this.index[args[i].id] = args[i];
                    }
                }
                return Array.prototype.unshift.apply(this, args);
            };

            IndexedArray.prototype.unshiftArray = function (items) {
                return this.unshift.apply(this, Array.prototype.slice.call(items, 0));
            };

            IndexedArray.prototype.clear = function () {
                this.splice(0, this.length);
            };

            IndexedArray.prototype.pop = function () {
                var item = Array.prototype.pop.call(this);
                delete this.index[item.id];
                return item;
            };

            IndexedArray.prototype.push = function () {
                if (arguments.length) {
                    var elements = Array.prototype.slice.call(arguments, 0);
                    for (var i = elements.length - 1; i >= 0; i--) {
                        if (!this.index[elements[i].id]) {
                            this.index[elements[i].id] = arguments[i];
                        } else {
                            elements.splice(i, 1);
                        }
                    }
                    Array.prototype.push.apply(this, elements);
                }
                return this.length;
            };

            IndexedArray.prototype.pushArray = function (items) {
                return this.push.apply(this, Array.prototype.slice.call(items, 0));
            };

            IndexedArray.prototype.map = function (callback, thisp) {
                return Array.prototype.map.call(this, callback, thisp);
            };

            IndexedArray.prototype.filterIndexed = function (callbackfn, thisArg) {
                var filtered = this.filter(callbackfn, thisArg);
                var indexed = new app.lib.IndexedArray();
                indexed.pushArray(filtered);
                return indexed;
            };

            IndexedArray.prototype.concat = function () {
                var indexed = this.concatIndexed.apply(this, Array.prototype.slice.call(arguments, 0));
                return indexed.toArray();
            };

            IndexedArray.prototype.concatIndexed = function () {
                var newArray = new app.lib.IndexedArray();
                Array.prototype.unshift.call(arguments, this);
                for (var i = 0; i < arguments.length; i++) {
                    newArray.push.apply(newArray, Array.prototype.slice.call(arguments[i], 0));
                }
                return newArray;
            };

            IndexedArray.prototype.toArray = function () {
                return Array.prototype.slice.call(this, 0, this.length);
            };

            IndexedArray.prototype.toIndexedArray = function () {
                var copy = new app.lib.IndexedArray();
                copy.push.apply(copy, this.toArray());
                return copy;
            };

            IndexedArray.prototype.forEach = function (callbackfn) {
                Array.prototype.forEach.apply(this, Array.prototype.slice.call(arguments, 0));
            };

            IndexedArray.prototype.map = function (callbackfn) {
                return Array.prototype.map.apply(this, Array.prototype.slice.call(arguments, 0));
            };

            IndexedArray.prototype.containsId = function (id) {
                return !!this.index[id];
            };

            //public sort(compareFn?: (a: T, b: T) => number): T[];
            /**
            * Zjisteni, zda kolekce obsahuje entitu
            * @param id
            * @returns {boolean}
            */
            IndexedArray.prototype.contains = function (entity) {
                return !!this.index[entity.id];
            };

            IndexedArray.prototype.indexOf = function (entity, fromIndex) {
                if (!this.index[entity.id]) {
                    return -1;
                }
                return Array.prototype.indexOf.apply(this, Array.prototype.slice.call(arguments, 0));
            };
            return IndexedArray;
        })(Array);
        lib.IndexedArray = IndexedArray;

        IndexedArray.prototype.constructor = [].constructor;
        IndexedArray.prototype.callee = function () {
        };
    })(app.lib || (app.lib = {}));
    var lib = app.lib;
})(app || (app = {}));
//# sourceMappingURL=indexedArray.js.map
