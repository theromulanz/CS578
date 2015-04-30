// ThoughtJar holds, organizes, and updates information for all private Thoughts. Will send state information when updated.
var ThoughtJar = function(connectorTop, connectorBottom) {

    // vars
    thoughts = [];
    
    // methods
    this.initialize = function() {
     
    }
    
    this.setThoughts = function(newThoughts){
        thoughts = newThoughts;
    }
    
    this.append = function(newData){
        connectorBottom.notify(newData, "thoughtJar append");
    }
    
    this.findName = function (name) {
            results = thoughts.filter(function (element) {
                return (element.name.toLowerCase() == name.toLowerCase() || element.name2.toLowerCase() == name.toLowerCase());
            });
        return results[0];
    }
    
    this.getThoughts = function(){
        connectorBottom.refresh();
        return thoughts;
    }

}