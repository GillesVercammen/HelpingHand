angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {

  var circles = document.getElementsByClassName('circle');

  $scope.circlesHidden = true;

  $scope.showCircles= function() {
    var $circles = angular.element(circles);
    if ($scope.circlesHidden) {
      $circles.addClass('active');
    } else {
      $circles.removeClass('active');
    }
    $scope.toggleCirclesHidden();
  };

  $scope.toggleCirclesHidden = function() {
    return $scope.circlesHidden = !$scope.circlesHidden;
  };

})

.controller('DiceCtrl', function() {

})

.controller('LifepointsCtrl', function(){

})

.controller('TimerCtrl', function(){
    
})
;