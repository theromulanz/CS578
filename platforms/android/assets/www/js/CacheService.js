// Cache holds items waiting to be sent via network. 
var CacheService = function (connectorTop, connectorBottom) {
    
    // vars
    var data = {};

    // methods
    this.initialize = function(){
        //this.refresh();
    }
    
    this.requestData = function(newData) {
  
        // Have data to send
        if(typeof newData !== 'undefined'){
            console.log("cache sending newData to conn then web service + action: " + newData.action + " " + newData.resource.author);
            newData.user = connectorTop.request("profile", "get", "name", null);
            var user = connectorTop.request("profile", "get", "name", null);
            newData.user = user;
            data = connectorTop.request("webServer", "append", "data", newData);
        }
        // only requesting data
        else{
            console.log("cache sending NO newData to conn then web service");
            var user = connectorTop.request("profile", "get", "name", null);
            var data = {
                    "user": user,
                    "componentName": "",
                    "action": "refresh",
                    "resource": "",
                    "resource2": ""
            };
            data = connectorTop.request("webServer", "get", "data", data);
        }

    }
    
    this.update = function(newData){
        if(typeof newData !== 'undefined'){
                console.log("update data: " + newData.action);
        }
        else{
            console.log("update new Data undefined");
        }
        
        this.requestData(newData);
    }
    
    this.refresh = function(){
        console.log("someone called refresh. sending to requestData");
        this.requestData();
    }
    
    this.finishRefresh = function (data){
        //console.log("name: " + data.profile.name);
        connectorTop.request("thoughtCollector", "set", "thoughts", data.thoughtCollector);
        connectorTop.request("thoughtJar", "set", "thoughts", data.thoughtJar);
        connectorTop.request("thoughtFest", "set", "thoughts", data.thoughtFest);
    }
    
    this.finishLogin = function (data){

        //console.log("name: " + data.profile.name);
        connectorTop.request("profile", "set", "profile", data.profile);
        connectorTop.request("thoughtCollector", "set", "thoughts", data.thoughtCollector);
        connectorTop.request("thoughtJar", "set", "thoughts", data.thoughtJar);
        connectorTop.request("thoughtFest", "set", "thoughts", data.thoughtFest);
    }
    
    

}