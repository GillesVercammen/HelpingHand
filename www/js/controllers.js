angular.module('starter.controllers', [])

.controller('MainCtrl', function ($scope) {

  var circles = document.getElementsByClassName('circle');

  $scope.circlesHidden = true;

  $scope.showCircles = function () {
    var $circles = angular.element(circles);
    if ($scope.circlesHidden) {
      $circles.addClass('active');
    } else {
      $circles.removeClass('active');
    }
    $scope.toggleCirclesHidden();
  };

  $scope.toggleCirclesHidden = function () {
    return $scope.circlesHidden = !$scope.circlesHidden;
  };

})
.controller('DiceCtrl', function ($rootScope, $scope, $localStorage) {
    //diepresent is checking if button is clicked, needed for generating random or not
    $scope.btnText1 = "Add second die";
    $scope.btnText2 = "Add third die";
    $scope.btnText3 = "Roll";
    $scope.die1Present = false;
    $scope.die2Present = false;
    var dieFaces1 = {
      '1': [270, 0], //270,0
      '2': [180, 180],
      '3': [180, 90],
      '4': [180, 0],
      '5': [180, 270],
      '6': [90, 310]
    };
    var dieFaces2 = {
      '1': [270, 180],
      '2': [0, 0],
      '3': [0, 270],
      '4': [0, 180],
      '5': [0, 90],
      '6': [90, 270]
    };
    var dieFaces3 = {
      '1': [270, 220],
      '2': [180, 180], //duplicate with 1
      '3': [180, 90], //duplicate with 1
      '4': [180, 0], //duplicate with 1
      '5': [180, 270], //duplicate with 1
      '6': [90, 580]
    };

    $scope.addDie1 = function () {
      if ($scope.add1) {
        $scope.die1Present = false;
        $scope.btnText1 = "Add second die"
        $scope.add1 = false;
        $("#die").css({
          "transform": "rotateX(0deg) rotateY(0deg)",
          "padding-top": "0px"
        })
        $("#die2").css({
          "display": "none",
          "transform": "rotateX(0deg) rotateY(90deg)"
        });
        $("#die3").css({
          "transform": "rotateX(0deg) rotateY(180deg)",
          "padding-top": "0px"
        })
        $scope.btnText3 = "Roll";
      } else {
        $scope.die1Present = true;
        $scope.btnText1 = "Remove second die"
        $scope.add1 = true;
        $("#die").css({
          "transform": "rotateX(0deg) rotateY(0deg)",
          "padding-top": "0px"
        })
        $("#die2").css({
          "display": "block",
          "transform": "rotateX(0deg) rotateY(90deg)"
        });
        $("#die3").css({
          "transform": "rotateX(0deg) rotateY(180deg)",
          "padding-top": "0px"
        })
        $scope.btnText3 = "Roll";
      }
    }
    $scope.addDie2 = function () {
      if ($scope.add2) {
        $scope.die2Present = false;
        $scope.btnText2 = "Add third die"
        $scope.add2 = false;
        $("#die").css({
          "transform": "rotateX(0deg) rotateY(0deg)",
          "padding-top": "0px"
        })
        $("#die2").css({
          "transform": "rotateX(0deg) rotateY(90deg)",
          "padding-top": "0px"
        })
        $("#die3").css({
          "display": "none",
          "transform": "rotateX(0deg) rotateY(180deg)",
          "padding-top": "0px"
        });
        $scope.btnText3 = "Roll";
      } else {
        $scope.die2Present = true;
        $scope.btnText2 = "Remove third die"
        $scope.add2 = true;
        $("#die").css({
          "transform": "rotateX(0deg) rotateY(0deg)",
          "padding-top": "0px"
        })
        $("#die2").css({
          "transform": "rotateX(0deg) rotateY(90deg)",
          "padding-top": "0px"
        })
        $("#die3").css({
          "display": "block",
          "transform": "rotateX(0deg) rotateY(180deg)",
          "padding-top": "0px"
        })
        $scope.btnText3 = "Roll";
      }
    }

    $scope.rollDice = function () {
      $scope.btnText3 = "Roll again"
      $("#die3").css("padding-top", "0px");
      $("#die").css("padding-top", "0px");

      //INITIAL DIE IS PRESENT
      $localStorage.random1 = Math.floor(Math.random() * 6) + 1
      $scope.die1Result = "die1: " + $localStorage.random1;
      $scope.rollTotal = "total: " + $localStorage.random1;
      
      var side1 = dieFaces1[$localStorage.random1];

      // IF PREVIOUS RANDOM == NEW RANDOM , THEN TOSS THE DICE UP SO IT DOESN'T STAY ON THE GROUND 
      if ($rootScope.lastRandom1 == $localStorage.random1) {
        //GO TO THE CORRECT SPOT AFTER 1 SEC, FIRST GO TO ANOTHER SPOT TO SIMULATE THROW
        setTimeout(function () {
          $("#die").css("transform", "rotateX(" + side1[0] + "deg) rotateY(" + side1[1] + "deg)");
        }, 1000)
        $("#die").css("transform", "rotateX(0deg) rotateY(180deg)");
      } else {
        $("#die").css("transform", "rotateX(" + side1[0] + "deg) rotateY(" + side1[1] + "deg)");
      }


      //DO THIS IF DIE 2 IS PRESENT
      if ($scope.die1Present == true) {
        $localStorage.random2 = Math.floor(Math.random() * 6) + 1
        $scope.die2Result = "die2: " + $localStorage.random2;
        $scope.rollTotal = "total: " + ($localStorage.random1 + $localStorage.random2);
        var side2 = dieFaces2[$localStorage.random2];

        if ($rootScope.lastRandom2 == $localStorage.random2 || $localStorage.random2 == 3 || $localStorage.random2 == 5) {
          //GO TO THE CORRECT SPOT AFTER 1 SEC, FIRST GO TO ANOTHER SPOT TO SIMULATE THROW
          setTimeout(function () {
            $("#die2").css("transform", "rotateX(" + side2[0] + "deg) rotateY(" + side2[1] + "deg)");
          }, 1000)
          $("#die2").css("transform", "rotateX(180deg) rotateY(0deg)");
        } else {
          $("#die2").css("transform", "rotateX(" + side2[0] + "deg) rotateY(" + side2[1] + "deg)");
        }

        if (($localStorage.random1 == 3 && $localStorage.random2 == 6) ||
          ($localStorage.random1 == 5 && $localStorage.random2 == 6)
        ) {
          $("#die").css("padding-top", "90px");
        }

      } else {
        $scope.die2Result = ""
      }

      //DO THIS IF DIE 3 IS PRESENT
      if ($scope.die2Present == true) {
        $localStorage.random3 = Math.floor(Math.random() * 6) + 1
        $scope.die3Result = "die3: " + $localStorage.random3;
        $scope.rollTotal = "total: " + ($localStorage.random1 + $localStorage.random2 + $localStorage.random3);
        var side3 = dieFaces3[$localStorage.random3];

        if ($rootScope.lastRandom3 == $localStorage.random3) {
          //GO TO THE CORRECT SPOT AFTER 1 SEC, FIRST GO TO ANOTHER SPOT TO SIMULATE THROW)
          setTimeout(function () {
            $("#die3").css("transform", "rotateX(" + side3[0] + "deg) rotateY(" + side3[1] + "deg)");
          }, 1000)
          $("#die3").css("transform", "rotateX(0deg) rotateY(180deg)");
        } else {
          $("#die3").css("transform", "rotateX(" + side3[0] + "deg) rotateY(" + side3[1] + "deg)");
        }

        if (($localStorage.random3 == $localStorage.random1) ||
          ($localStorage.random3 == 3 && $localStorage.random1 == 5) ||
          ($localStorage.random3 == 5 && $localStorage.random1 == 3) ||
          ($localStorage.random3 == 3 && $localStorage.random2 == 6) ||
          ($localStorage.random3 == 5 && $localStorage.random2 == 6)
        ) {
          $("#die3").css("padding-top", "90px");
        }

      } else {
        $scope.die3Result = ""
      }

      //do this if all dies are activated
      if ($scope.die1Present == true && $scope.die2Present == true) {
        if (($localStorage.random1 == 3 && $localStorage.random2 == 6 && $localStorage.random3 == 3) ||
          ($localStorage.random1 == 5 && $localStorage.random2 == 6 && $localStorage.random3 == 5) ||
          ($localStorage.random1 == 3 && $localStorage.random2 == 6 && $localStorage.random3 == 5) ||
          ($localStorage.random1 == 5 && $localStorage.random2 == 6 && $localStorage.random3 == 3)) {
          $("#die3").css("padding-top", "90px");
          $("#die").css("padding-top", "170px");
        }
      }
      $rootScope.lastRandom1 = $localStorage.random1;
      $rootScope.lastRandom2 = $localStorage.random2;
      $rootScope.lastRandom3 = $localStorage.random3;
    }
  })
  /*  (function($, self){
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
    // ADD / REMOVE DICE, CHANGE BUTTONS 

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
      
    $("#roll").click(function(e){
      e.preventDefault();
      $("#die3").css("padding-top", "0px");
      $("#die").css("padding-top", "0px");
      var random1 = Math.floor(Math.random()*6)+1
      var random2 = Math.floor(Math.random()*6)+1
      var random3 = Math.floor(Math.random()*6)+1
      
      var side1 = dieFaces1[random1];
      var side2 = dieFaces2[random2];
      var side3 = dieFaces3[random3];

      // IF PREVIOUS RANDOM == NEW RANDOM , THEN TOSS THE DICE UP SO IT DOESN'T STAY ON THE GROUND  
      if($rootScope.lastRandom1 == random1) 
      {
        //GO TO THE CORRECT SPOT AFTER 1 SEC, FIRST GO TO ANOTHER SPOT TO SIMULATE THROW
        setTimeout(function()
        {
          $("#die").css("transform","rotateX("+side1[0]+"deg) rotateY("+side1[1]+"deg)");    
        },1000)
        $("#die").css("transform","rotateX(0deg) rotateY(180deg)");
      } else 
      {
        $("#die").css("transform","rotateX("+side1[0]+"deg) rotateY("+side1[1]+"deg)");
      }
      if($rootScope.lastRandom2 == random2 || random2 == 3 || random2 == 5) 
      {
        //GO TO THE CORRECT SPOT AFTER 1 SEC, FIRST GO TO ANOTHER SPOT TO SIMULATE THROW
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
        //GO TO THE CORRECT SPOT AFTER 1 SEC, FIRST GO TO ANOTHER SPOT TO SIMULATE THROW)
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
        $("#die3").css("padding-top", "90px");
      }
      if ((random1 == 3 && random2 == 6) ||
          (random1 == 5 && random2 == 6)
      ) {
        console.log("random 1+2 duplicate");
        $("#die").css("padding-top","90px");
      }
      if ((random1== 3 && random2 == 6 && random3 == 3 ) ||
          (random1== 5 && random2 == 6 && random3 == 5 ) ||
          (random1== 3 && random2 == 6 && random3 == 5 ) ||
          (random1== 5 && random2 == 6 && random3 == 3 )
      ) {
        console.log("3 duplicates")
        $("#die3").css("padding-top", "90px");
        $("#die").css("padding-top","170px");
      }
      $rootScope.lastRandom1 = random1;
      $rootScope.lastRandom2 = random2;
      $rootScope.lastRandom3 = random3; 
      }); */

.controller('LifepointsCtrl', function () {

})

.controller('TimerCtrl', function ($scope) {
    button = $('.card__button');
    $scope.debug = function(){
      console.log($scope.counterInput)
    }
    button.on('click', function clicked() {
          $(this).addClass('card__button--triggered');

          $(this).off('click', clicked);

          var count = 10;
          var counter = setInterval(timer, 1000);

          function timer() {
            count -= 1;
            if (count === -1) {
              clearInterval(counter);

              setTimeout(function () {
                count = 100;
                document.getElementById("num").innerHTML = count;

                button.removeClass('card__button--triggered');
                button.on('click', clicked);

              }, 100);

              return;
            }
            document.getElementById("num").innerHTML = count;
          }

	
});

});
