
var Connector = function () {
    // vars
    componentsTopList = [];
    componentsBotList = [];

    // methods
    
    //
    this.attachTop = function(newComponent, name){
        newComponent.name = name;
        componentsTopList.push(newComponent);
    }
    
    this.attachBottom = function(newComponent, name){
        newComponent.name = name;
        componentsBotList.push(newComponent);
    }
    
    this.request = function(componentName, action, resourceName, resource, resource2) {
        
        //alert(JSON.stringify(resource));
        
        // Login request to server
        if(componentName == "webServer" && action == "login"){
            console.log("connector sending login request + data: ");

            if( resource != null){
                //console.log("connector sending web server action: " + action + " " + componentName + " " + resource.resource.author);
                resource = JSON.stringify(resource);
            }
            else{
                resource = JSON.stringify({"empty": "empty"});
            }

            var request = $.ajax({
              //url: "http:\\localhost:5000",
              url: "https://boiling-crag-6949.herokuapp.com",
              method: "POST",
              data: resource,
              dataType: "json",
              contentType: "application/json"
            });
             
            request.done(function( msg ) {
                //alert(JSON.stringify(msg));
                var obj = getObjBot("viewManager");
                if("failure" in msg){
                   obj.login(false);
                }
                else{
                    obj.login(true);
                    // console.log('AJAX Done: ' + msg.profile.name);
                    var obj = getObjBot("cacheService");
                    obj.finishLogin(msg);
                }

            });
             
            request.fail(function( jqXHR, textStatus ) {
              alert( "Request failed: " + textStatus );
            });
        }
        // data request to server
        else if(componentName == "webServer"){
            console.log("connector sending web server request + data: ");

            if( resource != null){
                //console.log("connector sending web server action: " + action + " " + componentName + " " + resource.resource.author);
                resource = JSON.stringify(resource);
            }
            else{
                resource = JSON.stringify({"empty": "empty"});
            }

            var request = $.ajax({
              //url: "http:\\localhost:5000",
              url: "https://boiling-crag-6949.herokuapp.com",
              method: "POST",
              data: resource,
              dataType: "json",
              contentType: "application/json"
            });
             
            request.done(function( msg ) {
                //alert(JSON.stringify(msg));
                var obj = getObjBot("viewManager");
                console.log('AJAX Done: ' + msg.profile.name);
                var obj = getObjBot("cacheService");
                obj.finishRefresh(msg);
            });
             
            request.fail(function( jqXHR, textStatus ) {
              alert( "Request failed: " + textStatus );
            });
        }
        else{
            var obj = getObjTop(componentName);
            if(action == "get"){
                var methodName = action + resourceName.capFirst();
                return obj[methodName]();
            }
            else if(action == "set"){
                var methodName = action + resourceName.capFirst();
                return obj[methodName](resource);
            }
            else if( action == "find"){
                var methodName = action + resourceName.capFirst();
                return obj[methodName](resource);
            }
            else{
                console.log("connector created newData and call to thought Coll "+ arguments.callee.caller.name);
                var newData = {
                    "user": "",
                    "componentName": componentName,
                    "action": action,
                    "resource": resource,
                    "resource2": resource2
                };
                var methodName = action;
                // why is this flow here?
                if(resource2){
                    return obj[methodName](newData);
                }
                else{
                    return obj[methodName](newData);
                }
            }
        
        }
        
        
    }
    
    this.notify = function(newData, caller){  
        console.log("connector sending notify to cache with newData " + caller);
        var name = "cacheService";
        var obj = getObjBot(name);
        obj["update"](newData);
    }
    
    this.refresh = function(){  
        var deferred = $.Deferred();
        console.log("connector refresh");
        var name = "cacheService";
        var obj = getObjBot(name);
        obj["refresh"]();
        deferred.resolve();
        return deferred.promise();
    }
    
    
    
    
    
    
    // Utility Functions
    
    function getObjTop(name){
        for(var i = 0; i< componentsTopList.length; i++){
            if(componentsTopList[i].name == name){
                return componentsTopList[i];
            }
        }
    }
    
    function getObjBot(name){
        for(var i = 0; i< componentsBotList.length; i++){
            if(componentsBotList[i].name == name){
                return componentsBotList[i];
            }
        }
    }
    
    String.prototype.capFirst = function() {
        return this[0].toUpperCase() + this.slice(1);
    }
    
    
}
