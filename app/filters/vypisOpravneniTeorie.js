var app;
(function (app) {
    (function (filter) {
        var VypisOpravneniTeorie = (function () {
            function VypisOpravneniTeorie() {
            }
            VypisOpravneniTeorie.filter = function (ucitel) {
                var result = [];
                var opravneni = {
                    'pravidla': 'pravidla silničního provozu',
                    'zdravoveda': 'zdravověda',
                    'udrzba': 'údržba'
                };
                for (var prop in opravneni) {
                    if (ucitel['opravneni_' + prop]) {
                        result.push(opravneni[prop]);
                    }
                }
                return result.join(', ');
            };
            return VypisOpravneniTeorie;
        })();
        filter.VypisOpravneniTeorie = VypisOpravneniTeorie;
    })(app.filter || (app.filter = {}));
    var filter = app.filter;
})(app || (app = {}));

app.registerFilter('VypisOpravneniTeorie');
//# sourceMappingURL=vypisOpravneniTeorie.js.map
