var app;
(function (app) {
    (function (filter) {
        var VypisOpravneniJizdy = (function () {
            function VypisOpravneniJizdy() {
            }
            VypisOpravneniJizdy.filter = function (ucitel) {
                return ['a', 'b', 'c', 'd', 't'].filter(function (letter) {
                    return ucitel['opravneni_jizdy_' + letter];
                }).map(function (letter) {
                    return letter.toUpperCase();
                }).join(', ');
            };
            return VypisOpravneniJizdy;
        })();
        filter.VypisOpravneniJizdy = VypisOpravneniJizdy;
    })(app.filter || (app.filter = {}));
    var filter = app.filter;
})(app || (app = {}));

app.registerFilter('VypisOpravneniJizdy');
//# sourceMappingURL=vypisOpravneniJizdy.js.map
