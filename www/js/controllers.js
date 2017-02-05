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

.controller('DiceCtrl', function($scope) {
  
     (function($, self){
      if(!$ || !self) {
      return;
      }
      for(var i=0; i<self.properties.length; i++) {
      var property = self.properties[i],
      camelCased = StyleFix.camelCase(property),
      PrefixCamelCased = self.prefixProperty(property, true);
      $.cssProps[camelCased] = PrefixCamelCased;
      }
      })(window.jQuery, window.PrefixFree);

    //Actual code for Play Action , still buggy for 2 dice stacking on top of eachother
    $(function(){
      
    $("#addDie1").click(function(e){
      e.preventDefault();
      $("#die2").css("display","block");
    });
    $("#addDie2").click(function(e){
      e.preventDefault();
      $("#die3").css("display","block");
    });
    $()
    var x=[0,90,180,270];
    $("#play").click(function(e){
      e.preventDefault();
      do {
        var rand1=Math.floor(Math.random()*4);
        var rand2=Math.floor(Math.random()*4);
        var rand3=Math.floor(Math.random()*4);
        var rand4=Math.floor(Math.random()*4);
        var rand5=Math.floor(Math.random()*4);
        var rand6=Math.floor(Math.random()*4);
      } while((x[rand1] == x[rand3] && x[rand2] == x[rand4]) || (x[rand1] == x[rand5] && x[rand2] == x[rand6]) || (x[rand3] == x[rand5] && x[rand4] == x[rand6]))

        console.log(x[rand1] + "\n" + x[rand2] + "\n" + x[rand3] + "\n" + x[rand4] + "\n" + x[rand5] + "\n" + x[rand6] + "\n")
        $("#die").css("transform","rotateX("+x[rand1]+"deg) rotateY("+x[rand2]+"deg)");
        $("#die2").css("transform","rotateX("+x[rand3]+"deg) rotateY("+x[rand4]+"deg)"); 
        $("#die3").css("transform","rotateX("+x[rand5]+"deg) rotateY("+x[rand6]+"deg)");    

        var position = $("#die").offset();
      console.log(position);
      });
      var position = $("#die").offset();
      console.log(position);

    });
})

.controller('LifepointsCtrl', function(){

})

.controller('TimerCtrl', function(){
    
})
;