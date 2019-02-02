'use strict';

var electron = require('electron');
var remote = electron.remote;
var fileUtil = remote.require('./lib/fileUtil');
var baseDir = process.cwd();

var ngModule = angular.module('readUs', []);

ngModule.controller('MainController', function ($scope) {
  var main = this;

  // Get README.md
  main.getFile = function(file) {
    main.fileText = fileUtl.getAsText(file.filepath);
  };

  fileUtil.fetchReadmeList(baseDir, function (err, fileList) {
      if(err) console.error(err);
      $scope.$apply(function () {
        main.fileList = fileList;
      });
  });
});

ngModule.directive('mdPreview', function () {
  return function ($scope, $elem, $attrs) {
    $scope.$watch($attrs.mdPreview, function(source) {
      $elem.html(marked(source));
    });
  };
});
