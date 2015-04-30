// Environment holds the values related to physical environment. Will send state information when updated.
var Environment = function() {
    // vars
    var location = { "latitude": 0, "longitude": 0 };

    // methods
    this.initialize = function() {
        this.setLocation();
    }
    
    this.setLocation = function(){
        var onSuccess = function(position) {
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
        };

        // onError Callback receives a PositionError object
        function onError(error) {
            //alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
 
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    
    this.getLocation = function(){      
        return location;
    }
    
}