angular.module('starter.controllers', [])

.controller('MainCtrl', function() {

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

.controller('DiceCtrl', function($rootScope) {
  
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

    $(function(){
    /* ADD / REMOVE DICE, CHANGE BUTTONS */
    $(document).on("click", "#addDie1", function(e){
      e.preventDefault();
       var el = $(this);
      el.text("Remove second die") 
      el.attr("id","removeDie1");
      $("#die2").css({"display":"block","transform":"rotateX(0deg) rotateY(90deg)"});
      $("#die").css("transform","rotateX(0deg) rotateY(0deg)")
    }); 
    $(document).on("click", "#removeDie1", function(e){
      e.preventDefault();
      var el = $(this);
      el.text("Add second die")
      el.removeAttr("id");
      el.attr("id","addDie1");
      $("#die2").css({"display":"none","transform":"rotateX(0deg) rotateY(90deg)"});
    });
    $(document).on("click", "#addDie2", function(e){
      e.preventDefault();
       var el = $(this);
      el.text("Remove third die") 
      el.attr("id","removeDie2");
      $("#die3").css({"display":"block","transform":"rotateX(0deg) rotateY(180deg)","padding-top":"0px"});
      $("#die").css("transform","rotateX(0deg) rotateY(0deg)")
      $("#die2").css("transform","rotateX(0deg) rotateY(90deg)")
    }); 
    $(document).on("click", "#removeDie2", function(e){
      e.preventDefault();
      var el = $(this);
      el.text("Add third die")
      el.removeAttr("id");
      el.attr("id","addDie2");
      $("#die3").css({"display":"none","transform":"rotateX(0deg) rotateY(180deg)"});
    });

    //ACTUAL CODE FOR ROLLING
    	var dieFaces1 = {
	      '1' : [270, 0], //270,0
	      '2' : [180,180],
	      '3' : [180,90],
	      '4' : [180,0],
	      '5' : [180,270],
	      '6' : [90,310]
	    };
      var dieFaces2 = {
	      '1' : [270,180],
	      '2' : [0,0],
	      '3' : [0,270],
	      '4' : [0,180],
	      '5' : [0,90],
	      '6' : [90,270]
	    };
      var dieFaces3 = {
	      '1' : [270,220], 
	      '2' : [180,180], //duplicate with 1
	      '3' : [180,90],   //duplicate with 1
	      '4' : [180,0],   //duplicate with 1
	      '5' : [180,270],    //duplicate with 1
	      '6' : [90,580]
	    };
      
      //FIX WITH GIVING MARGIN IF ALL NUMBERS ARE SAME, IF 2 ARE SAME, USE VALUE OF OTHER DUPLIATE
    $("#roll").click(function(e){
      e.preventDefault();
      console.log($rootScope.lastRandom1 +"\n" + $rootScope.lastRandom2 + "\n" + $rootScope.lastRandom2)
      $("#die3").css("padding-top", "0px");
      $("#die").css("padding-top", "0px");
      var random1 = Math.floor(Math.random()*6)+1
      var random2 = Math.floor(Math.random()*6)+1
      var random3 = Math.floor(Math.random()*6)+1
     
      var side1 = dieFaces1[random1];
      var side2 = dieFaces2[random2];
      var side3 = dieFaces3[random3];

      /* IF PREVIOUS RANDOM == NEW RANDOM , THEN TOSS THE DICE UP SO IT DOESN'T STAY ON THE GROUND  */
      if($rootScope.lastRandom1 == random1) 
      {
        console.log("same number 1")
        setTimeout(function()
        {
          $("#die").css("transform","rotateX("+side1[0]+"deg) rotateY("+side1[1]+"deg)");    
        },1000)
        $("#die3").css("transform","rotateX(0deg) rotateY(180deg)");
      } else 
      {
        $("#die").css("transform","rotateX("+side1[0]+"deg) rotateY("+side1[1]+"deg)");
      }
      if($rootScope.lastRandom2 == random2 || random2 == 3 || random2 == 5) 
      {
        console.log("same number 2")
        setTimeout(function()
        {
          $("#die2").css("transform","rotateX("+side2[0]+"deg) rotateY("+side2[1]+"deg)");          
        },1000)
        $("#die2").css("transform","rotateX(180deg) rotateY(0deg)");
      } else
       {
        $("#die2").css("transform","rotateX("+side2[0]+"deg) rotateY("+side2[1]+"deg)");
      }
      if($rootScope.lastRandom3 == random3) 
      {
        console.log("same number 3")
        setTimeout(function()
        {
          $("#die3").css("transform","rotateX("+side3[0]+"deg) rotateY("+side3[1]+"deg)");
        },1000)
       $("#die3").css("transform","rotateX(0deg) rotateY(180deg)");      
      } else 
      {
        $("#die3").css("transform","rotateX("+side3[0]+"deg) rotateY("+side3[1]+"deg)");
      }

      if ((random3 == random1) ||
          (random3 == 3 && random1 == 5) ||
          (random3 == 5 && random1 == 3) ||
          (random3 == 3 && random2 == 6) ||
          (random3 == 5 && random2 == 6)
          ) {
        console.log("random3: " + random3)
        $("#die3").css("padding-top", "80px");
      }
      if ((random1 == 3 && random2 == 6) ||
          (random1 == 5 && random2 == 6)
      ) {
        console.log("random 1+2 duplicate");
        $("#die").css("padding-top","80px");
      }
      if ((random1== 3 && random2 == 6 && random3 == 3 ) ||
          (random1== 5 && random2 == 6 && random3 == 5 ) ||
          (random1== 3 && random2 == 6 && random3 == 5 ) ||
          (random1== 5 && random2 == 6 && random3 == 3 )
      ) {
        console.log("3 duplicates")
        $("#die3").css("padding-top", "80px");
        $("#die").css("padding-top","160px");
      }
      $rootScope.lastRandom1 = random1;
      $rootScope.lastRandom2 = random2;
      $rootScope.lastRandom3 = random3; 
      });
    });
})

.controller('LifepointsCtrl', function(){

})

.controller('TimerCtrl', function(){
    
})
;