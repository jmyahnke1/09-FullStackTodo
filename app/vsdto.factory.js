(function() {
    'use strict';

    angular
        .module('vstdaApp')
        .factory('VSTDAFactory', VSTDAFactory);

    VSTDAFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function VSTDAFactory($http, $q, $log) {
        var service = {
            getTask: getTask,
            postTask: postTask,
            putTask: putTask,
            deleteTask:deleteTask
        };
        return service;

        function getTask() {
          var defer = $q.defer();  //Set up the promise
          var url = 'http://localhost:51929/api/ToDomodels';  //Here is my URL.  Change the port number to match your machine!

          //HTTP call -- Set the data type and method call
          $http({
              method: "GET",
              headers: {
                       'Content-Type': 'application/json; charset=utf-8'
                   },
              url: url
            }) // end of http
            .then(
              function(response) {
                if (typeof response.data === 'object') {
                  defer.resolve(response);    //resolve the promise as good data.
                } else {
                  defer.reject(response);     //Else it's bad data, and return the rejected promise.
                }
              },
              // failure    //Total failure. Return an error in the promise.
              function(error) {
                defer.reject(error);
                $log.error(error);
              });
          return defer.promise;   //End of function, return the promise.
        }

        function postTask(taskInfo) {
          var defer = $q.defer();
          var url = 'http://localhost:51929/api/ToDomodels';

          //console.log(taskInfo);
          $http({
              method: "POST",
              url: url,
              headers: {
                       'Content-Type': 'application/json; charset=utf-8'
                   },
              data: taskInfo
            }) // end of http
            .then(
              function(response) {
                if (typeof response.data === 'object') {
                  defer.resolve(response);
                  //console.log(response);
                } else {
                  defer.reject(response);
                }
              },
              // failure
              function(error) {
                defer.reject(error);
                $log.error(error);
              });
          return defer.promise;
        }

        function deleteTask(taskInfo) {
          var defer = $q.defer();
          var url = 'http://localhost:51929/api/ToDomodels';

          //console.log(taskInfo);
          $http({
              method: "DELETE",
              url: url + '/' + taskInfo.keyId,
              headers: {
                       'Content-Type': 'application/json; charset=utf-8'
                   },
              data: taskInfo
            }) // end of http
            .then(
              function(response) {
                if (typeof response.data === 'object') {
                  defer.resolve(response);
                  //console.log(response);
                } else {
                  defer.reject(response);
                }
              },
              // failure
              function(error) {
                defer.reject(error);
                $log.error(error);
              });
          return defer.promise;
        }

        function putTask(taskInfo) {
          var defer = $q.defer();
          var url = 'http://localhost:51929/api/ToDomodels';

          //.log("taskInfo in factory");
          //console.log(taskInfo);
          $http({
              method: "PUT",
              url: url + '/' + taskInfo.keyId,
              headers: {
                       'Content-Type': 'application/json; charset=utf-8'
                   },
              data: taskInfo
            }) // end of http
            .then(
              function(response) {
                if (typeof response.data === 'object') {
                  defer.resolve(response);
                  //console.log(response);
                } else {
                  defer.reject(response);
                }
              },
              // failure
              function(error) {
                defer.reject(error);
                $log.error(error);
              });
          return defer.promise;
        }
      }
})();
