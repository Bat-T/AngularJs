(function(){

    'use strict';
    angular.module('LunchCheck',[]).controller('LunchCheckController',DIController);
    DIController.$injector=['$scope'];
    function DIController($scope)
    {
        $scope.LunchItems="";
        $scope.Message="";
        $scope.NoteMessage ="";
        $scope.BorderColor = "2px solid black";
        $scope.GetLunchStatement = function()
        {
            if($scope.LunchItems=="")
            {
              $scope.Message= "Please enter data first";
              $scope.NoteMessage ="";
            }
            else
            {
                var ItemArr = $scope.LunchItems.split(',');
                var ItemArrWithoutEmpty= ItemArr.filter(function (e) { return e.replace(" ","").replace(/(\r\n|\n|\r)/gm,"")});
                var LunchItemCount= ItemArrWithoutEmpty.length;
                if(LunchItemCount==0)
                   $scope.Message= "Please enter data first";
                else if(LunchItemCount<=3)
                {
                  $scope.IsEnjoy = true;
                  $scope.BorderColor = "2px solid green";
                  $scope.Message= "Enjoy!";
                }
                else
                {
                  $scope.IsEnjoy = false;
                  $scope.BorderColor = "2px solid red";
                  $scope.Message= "Too much!";
                }

                $scope.NoteMessage = "NOT considering an empty item, i.e., , , as an item towards to the count";
            }
        };
    };

})();
