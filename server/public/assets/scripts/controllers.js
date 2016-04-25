myApp.controller("AddController", ["$scope", "$http", "VillainService", "$location", function($scope, $http, VillainService, $location){
    $scope.villains = {};
    $scope.data = [];
    $scope.forceData = [];


    // $scope.search = function(data){
    //     console.log("we are gonna search for", data);
    //     $http.get("http://www.omdbapi.com/?t=" + data.name + "&y=&plot=full&r=json").then(function(response){
    //         console.log(response.data);
    //         $scope.data = [];
    //         $scope.data.push(response.data);
    //     });
    // };

    $scope.addVillain = function(data){
        console.log(" in controllers add villain",data);
        var postObject = {};
        postObject.Name = data.Name;
        postObject.Power = data.Power;
        postObject.Foe = data.Foe;
        postObject.Weakness = data.Weakness;
        postObject.Image = data.Image;

        VillainService.postVillain(postObject);
        $location.url('/view');
    };
}]);

myApp.controller("ShowController", ["$scope", "VillainService", function($scope, VillainService){

        $scope.forceresponse = [];
    console.log("in ShowController");

    //------

        $scope.deleteVillain = function(villainId){
            console.log("fixing to nuke", villainId);
            var nukeId = {"villainId": villainId};
            VillainService.nukeVillain(nukeId);

        };

        // page has loaded.
    //-----
    VillainService.getVillains();

    VillainService.getSalesforce();

    //VillainService.pullData();

    $scope.data = VillainService.data;
    $scope.forceData = VillainService.forceData;
    console.log("forcedata", VillainService.forceData);
    $scope.forceresponse = VillainService.forceresponse;





}]);
