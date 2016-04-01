myApp.factory("VillainService", ["$http", function($http){
    var data = {};

    var postVillain = function(data){
        $http.post("/villain", data).then(function(response){
            console.log("villain saved", response);
            getVillains();
        });
    };

    var getVillains = function(){
        $http.get("/villain").then(function(response){
            console.log("get villains", response.data);
            data.response = response.data;
        });
    };

    var nukeVillain = function(villainId){
        console.log("in factory", villainId.villainId);
        $http.delete("/villain/" + villainId.villainId).then(function(response){
        getVillains();
    });
};

    return{
        nukeVillain : nukeVillain,
        postVillain : postVillain,
        getVillains : getVillains,
        data : data
    };
}]);
