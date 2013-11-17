var app;
(function (app) {
    (function (filter) {
        var Ids = (function () {
            function Ids() {
            }
            Ids.filter = function (entities, id_property) {
                return entities.map(function (entity) {
                    return entity[id_property];
                });
            };
            return Ids;
        })();
        filter.Ids = Ids;
    })(app.filter || (app.filter = {}));
    var filter = app.filter;
})(app || (app = {}));

app.registerFilter('Ids');
//# sourceMappingURL=ids.js.map
