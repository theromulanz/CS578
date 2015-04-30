// ThoughtFest is a ThoughtCollector that is dedicated to specific topic and eventually expires. Will send state information when updated.
var ThoughtFest = function(connectorTop, connectorBottom) {

    // vars
    var thoughtFests = [];
    
    // methods
    this.initialize = function() {
      
    }
    
    this.setThoughts = function(newThoughts){
        thoughtFests = newThoughts;
    }
    
    this.getThoughts = function() {
        connectorBottom.refresh();
        return thoughtFests;
    }
    
    this.findId = function (id) {
        len = thoughtFests.length;

        for (var i = 0; i < len; i++) {
            if (thoughtFests[i].id === id) {
                return thoughtFests[i];
            }
        }       
        return -1;
    }
    
    this.add = function(newFest){
        newFest.id = Math.floor((Math.random() * 100000) + 1); 
        thoughtFests.unshift(newFest);
    }
    
    this.append = function(newThought, id){
        for (var i = 0; i < thoughtFests.length; i++) {
            if (thoughtFests[i].id === id) {
                thoughtFests[i].thoughts.unshift(newThought);
                return 0;
            }
        }
    }
    
    this.getDate = function() {
      
    }
    
    this.getHeadline = function() {
      
    }
    
   this.insertThought = function() {
      
    }
    
    this.heapify = function() {
      
    }
    
    this.deleteThought = function() {
      
    }
    
    this.getTopThought = function() {
      
    }
    
    this.getLeftChild = function() {
      
    }
    
    this.getRightChile = function() {
      
    }
    
    this.getParent = function() {
      
    }
    
    this.getSortedThoughts = function() {
      
    }
}