myApp.factory("VillainService", ["$http", function($http){
    var data = {};
    var forceresponse  = {};
    var forceData = {};

    var getSalesforce = function(data){

        if (!forceresponse.accessToken){
            console.log("I want to do a check in getSalesforce to see if I need to auth. ", forceresponse.accessToken);
            $http.get("/force").then(function(response){
                // console.log("get force", response.data);
                forceresponse.response = response.data;
                forceresponse.accessToken = response.data.accessToken;
                forceresponse.instanceUrl = response.data.instanceUrl;
                pullData();
            });



        }else {
            console.log("DID NOT reauthroize");
            pullData();
        }


    };

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

    var pullData = function(queryString){

        console.log("in pull, stored instanceUrl=",forceresponse.instanceUrl);


        $http.get("/pull", {
            params: { accessToken: forceresponse.accessToken, instanceUrl: forceresponse.instanceUrl  }
        }).then(function(response){
            console.log("Hey I got something", response.data.records);
            forceData.response  = response.data.records;
        });





    };

    var itWorked = function(response){
        console.log("it worked", response);
    }



    return{
        nukeVillain : nukeVillain,
        postVillain : postVillain,
        getVillains : getVillains,
        getSalesforce : getSalesforce,

        data : data,
        forceData : forceData,
        forceresponse : forceresponse
    };
}]);
