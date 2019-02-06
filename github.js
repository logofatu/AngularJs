(function() {


  var github = function($http) {
  var getUser = function(username){
    return $http.get("https://api.github.com/users/" + username)
                .then(function(response){
                  return response.data;
                });
  };

  var getRepos = function(user){
    return $http.get(user.repos_url)
                .then(function(response){
                  return response.data;
                });
  }; 
  
  var getRepodetails = function (username, reponame){
    var repo;
    var repoUrl = "http://api.github.com/repos/" + username + "/" + reponame;
    //https://api.github.com/users/angular/repos
    //var repoUrl = "http://api.github.com/users/" + username + "/repos" + reponame;
    //https://api.github.com/repos/angular/a/contributors
    
    return $http.get(repoUrl)
                .then(function(response){
                  repo = response.data;
                  return $http.get(repoUrl + "/contributors")
                  })
                .then(function(response){
                  repo.contributors = response.data;
                  return repo;
                });
  };

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepodetails: getRepodetails
    };
  };

  var module = angular.module("githubViewer");
  module.factory("github", github);

}());