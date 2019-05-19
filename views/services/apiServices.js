app.service('apiServices',
  function ($http, $q, APP_CONSTANT) {
    this.call = function (URL, data, methodType) {
      var deferred = $q.defer();
      $http({
          method: methodType,
          url: APP_CONSTANT.APIURL + URL,
          data: data
      }).then((response) => {    
          deferred.resolve(response.data);
      }).catch((errors) => {
          deferred.reject(errors);
      })
      return deferred.promise;
    }
    return this;
  }
);