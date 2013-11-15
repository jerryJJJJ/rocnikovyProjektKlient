var app;
(function (app) {
    (function (filter) {
        var ActiveStudents = (function () {
            function ActiveStudents() {
            }
            ActiveStudents.filter = function (students, courses) {
                return students.filter(function (student) {
                    var state = courses.find(student['kurz_id'])['stav'];
                    return state == 'probihajici' || state == 'jde_ke_zkousce';
                });
            };
            return ActiveStudents;
        })();
        filter.ActiveStudents = ActiveStudents;
    })(app.filter || (app.filter = {}));
    var filter = app.filter;
})(app || (app = {}));

app.registerFilter('ActiveStudents');
//# sourceMappingURL=activeStudents.js.map
