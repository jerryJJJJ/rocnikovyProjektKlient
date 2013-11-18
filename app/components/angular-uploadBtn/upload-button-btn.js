/// # Upload Button
//
// A custom directive to add single click upload
// 
// example
//
// <upload-button
//    action="/api/files"
//    complete="uploaded($data, $status)">
//   Upload File
// </upload-button>
//
// for more details see readme.md
//
angular.module('upload.button', [])
  .directive('uploadButton', ['$parse', '$compile', '$http', function($parse, $compile, $http) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: btnTemplate(),
      link: function(scope, element, attrs) {
        element.find('input')[0].addEventListener('change', function() {

          var formData = new FormData();

          var file = this.files[0];
          if ( window.FileReader ) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
              //showUploadedItem(e.target.result, file.fileName);
            };
            reader.readAsDataURL(file);
          }
          if (formData) {
            formData.append("file", file);
          }
          // send to server as uploadFile field

          $.ajax({
            url: attrs.action,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
              scope.$apply(function() {
                var fn = $parse(attrs.complete);
                if(fn) { fn(scope, { $data: response.data, $status: response.status }); }
              });
            }
          });

          /*
          $http(attrs.action, fd, {
            url: attrs.action,
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: formData
          }).then(function (response) {
            var fn = $parse(attrs.complete);
            if(fn) { fn(scope, { $data: response.data, $status: response.status }); }
          });
          //*/

/*
          // create xhr
          var xhr = new XMLHttpRequest();

          xhr.addEventListener("load", function(e) {
            var fn = $parse(attrs.complete);
            scope.$apply(function () {
              if(fn) { fn(scope, { $data: xhr.responseText, $status: xhr.status }); } 
            });
          }, false);

          xhr.send(fd);
          */
        });
      }
    };
}]);

// directive template
function btnTemplate() {
  return '<span class="{{class}}" style="position: relative;overflow: hidden;margin-right: 4px;"' +'>' +
           '<span ng-transclude></span>' +
           '<input type="file" style="position: absolute;top: 0;right: 0;margin: 0;opacity: 0;filter: alpha(opacity=0);transform: translate(-300px, 0) scale(4);font-size: 23px;direction: ltr;cursor: pointer;">' +
         '</span>';
}
