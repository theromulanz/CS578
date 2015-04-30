// Profile holds the values related to user information (i.e. name, id). Will send state information when updated.
var Profile = function(connectorTop, connectorBottom) {

    // vars
    var profile = {};
    
    // methods
    this.initialize = function() {
        /*
        window.localStorage.setItem("profile", JSON.stringify(
            {   "name": "Justin",
                "id": "123456",
                "username": "",
                "password": "",
                "gender": "male"
            }
        ));
        
        // parse the json
        profile = JSON.parse(window.localStorage.getItem("profile"));
        */
    }
    
    this.getProfile = function () {
        return profile;
    }
    
    this.setProfile = function(updatedProfile){
        profile = updatedProfile;
    }
    
    this.getName = function() {
        return profile.name;
    }
    
    this.getId = function() {
      
    }
    
    this.getGender = function() {
      
    }
    
    this.getDegreeType = function() {
      
    }
    
    this.getDegreeType = function() {
      
    }
    
    this.setName = function() {
      
    }
    
    this.setGender = function() {
      
    }
    
    this.setDegreeType = function() {
      
    }
    
    this.setPassword = function() {
      
    }
    
    this.getPassword = function() {
        return profile.password;
    }
    
    this.setUserName = function() {
      
    }
    
    this.getUsername = function() {
        return profile.username;
    }
    
    this.initialize();
}