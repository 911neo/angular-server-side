var chef= angular.module('chef',['ngAnimate','ui.router','ngMaterial'])
.config(function($stateProvider,$urlRouterProvider){

  $urlRouterProvider.otherwise('/');
     $stateProvider
     .state('home',{
       url:'/',
         templateUrl:'/static/home.html',
         controller:'chefController as chefList'
     })
     .state('about',{
       url:'/about',
         templateUrl:'/static/about.html',

     })
     .state('login',{
       url:'/login',
         templateUrl:'/static/login.html',

     })
     .state('register',{
       url:'/register',
         templateUrl:'/static/register.html',

     });


})



chef.controller('chefController',['$scope','$http',function($scope,$http){

  console.log("Hello World from controller");
var refresh = function() {
$http.get('/cheflist').success(function(response){
  console.log("got the data requesteds");
  $scope.cheflist = response;
  $scope.chef = "";

});
};
refresh();

$scope.addContact = function() {
  console.log($scope.cheflist);
  $http.post('/cheflist',$scope.chef).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/cheflist/'+id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/cheflist/' + id).success(function(response) {
    $scope.chef = response;
  });
};
$scope.update = function() {
  console.log($scope.chef._id);
  $http.put('/cheflist/'+$scope.chef._id,$scope.chef).success(function(response) {
    refresh();
  });

};

$scope.deselect = function() {
  $scope.chef = "";
}

















}]);
