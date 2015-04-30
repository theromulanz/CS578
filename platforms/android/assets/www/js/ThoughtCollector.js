// ThoughtCollector holds, organizes, and updates information for all public Thoughts. Will send state information when updated.
var ThoughtCollector = function(connectorTop, connectorBottom) {

    var thoughts = [];
            
    this.initialize = function() {
        alert(thoughts[1].author);
    }
    
    this.setThoughts = function(newThoughts){
        thoughts = newThoughts;
    }
    
    this.notify = function(){
        
    }
    
    this.append = function(newData){
        //thoughts.unshift(newThought);
        console.log("thoughtColl notifying connector with newData " + newData.action);
        connectorBottom.notify(newData, "thoughtColl append");
        return ;
    }
    
    this.getThoughts = function(){
        connectorBottom.refresh();
        return thoughts;
    }

    this.findByScore = function (id) {

        var deferred = $.Deferred(),
            employees = JSON.parse(window.localStorage.getItem("employees")),
            employee = null,
            l = employees.length;

        for (var i = 0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }

        deferred.resolve(employee);
        return deferred.promise();
    }

    this.findByName = function (searchKey) {
        var deferred = $.Deferred(),
            employees = JSON.parse(window.localStorage.getItem("employees")),
            results = employees.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        deferred.resolve(results);
        return deferred.promise();
    }
    
    this.findAll = function () {
        var deferred = $.Deferred(),
            employees = JSON.parse(window.localStorage.getItem("employees")),
            results = employees.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName;
            });
        deferred.resolve(results);
        return deferred.promise();
    }

}