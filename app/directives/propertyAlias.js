var app;
(function (app) {
    (function (directive) {
        var PropertyAlias = (function () {
            function PropertyAlias() {
                this.restrict = "A";
            }
            PropertyAlias.prototype.link = function (scope, iElement, attrs) {
                var oldValue;

                scope.$watchCollection(attrs['propertyAlias'], function (value) {
                    if (oldValue) {
                        for (var prop in oldValue) {
                            if (oldValue.hasOwnProperty(prop)) {
                                delete scope[prop];
                            }
                        }
                    }

                    if (value) {
                        for (var prop in value) {
                            if (value.hasOwnProperty(prop)) {
                                scope[prop] = value[prop];
                            }
                        }
                    }

                    //ulozime novou hodnotu
                    oldValue = value;
                });
            };
            return PropertyAlias;
        })();
        directive.PropertyAlias = PropertyAlias;
    })(app.directive || (app.directive = {}));
    var directive = app.directive;
})(app || (app = {}));

app.registerDirective('PropertyAlias');
//# sourceMappingURL=propertyAlias.js.map
