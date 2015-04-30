// Profile holds the values related to user information (i.e. name, id). Will send state information when updated.
var Profile = function(connectorTop, connectorBottom) {

    // vars
    var profile = {};
    
    // methods
  
    this.getProfile = function () {
        return profile;
    }
    
    this.setProfile = function(updatedProfile){
        profile = updatedProfile;
    }
    
    this.getName = function() {
        return profile.name;
    }
    
    
    this.getPassword = function() {
        return profile.password;
    }
    
    
    this.getUsername = function() {
        return profile.username;
    }
}