// ViewManager generates appropriate view according to state of application. 
var ViewManager = function( connectorTop, connectorBottom) {

    // methods
    this.initialize = function() {

        // Templates
        homeTemplate = Handlebars.compile($("#home-tpl").html());
        thoughtCollectorTemplate = Handlebars.compile($("#thoughtCollector-tpl").html());
        thoughtBuilderTemplate = Handlebars.compile($("#thoughtBuilder-tpl").html());
        loginTemplate = Handlebars.compile($("#login-tpl").html());
        thoughtJarTemplate = Handlebars.compile($("#thoughtJar-tpl").html());
        privateThreadBuilderTemplate = Handlebars.compile($("#privateThreadBuilder-tpl").html());
        thoughtJarUserTemplate = Handlebars.compile($("#thoughtJarUser-tpl").html());
        privateThoughtBuilderTemplate = Handlebars.compile($("#privateThoughtBuilder-tpl").html());
        thoughtFestsTemplate = Handlebars.compile($("#thoughtFests-tpl").html());
        thoughtFestTemplate = Handlebars.compile($("#thoughtFest-tpl").html());
        thoughtFestBuilderTemplate = Handlebars.compile($("#thoughtFestBuilder-tpl").html());
        thoughtBuilderFestTemplate = Handlebars.compile($("#thoughtBuilderFest-tpl").html());
        
             
        // Create slider for transition effect
        var slider = new PageSlider($('#container'));
        
        //  Hash Router
        
        router.addRoute('', function() {
            location.hash = "#login";
        });
        
        router.addRoute('login', function() {
            $('#container').append('<div id="login"></div>');
            var login = $("#login").html(loginTemplate());
            document.getElementById('loginBtn').onclick = validated;
            slider.slidePage(login);
        });
        
        router.addRoute('home', function() {
            $('#container').append('<div id="home"></div>');
            var home = $("#home").html(homeTemplate());
            slider.slidePage(home);
        });

        router.addRoute('thoughtCollector', function() {
            var thoughts = connectorTop.request("thoughtCollector", "get", "thoughts", null);
            $('#container').append('<div id="thoughtCollector"></div>');
            var TC = $("#thoughtCollector").html(thoughtCollectorTemplate(thoughts));
            slider.slidePage(TC);
        });
        
        router.addRoute('thoughtBuilder', function() {
            connectorTop.request("environment", "set", "location", null);
            $('#container').append('<div id="thoughtBuilder"></div>');
            var TB = $("#thoughtBuilder").html(thoughtBuilderTemplate());
            document.getElementById("newThoughtBtn").addEventListener("click", newThought);
            slider.slidePage(TB);
        });
        
        router.addRoute('thoughtJar', function() {
            thoughtJarThoughts = connectorTop.request("thoughtJar", "get", "thoughts", null);
            var name = connectorTop.request("profile", "get", "name", null);
            for(var i = 0; i< thoughtJarThoughts.length; i++){
                if(thoughtJarThoughts[i].name == name){
                    var tmp = thoughtJarThoughts[i].name;
                    thoughtJarThoughts[i].name = thoughtJarThoughts[i].name2;
                    thoughtJarThoughts[i].name2 = thoughtJarThoughts[i].name;
                }
            }
            $('#container').append('<div id="thoughtJar"></div>');
            var TJ = $("#thoughtJar").html(thoughtJarTemplate(thoughtJarThoughts));
            slider.slidePage(TJ);
        });
        
        router.addRoute('privateThreadBuilder', function() {
            $('#container').append('<div id="privateThreadBuilder"></div>');
            var PTB = $("#privateThreadBuilder").html(privateThreadBuilderTemplate());
            document.getElementById("newPrivateThreadBtn").addEventListener("click", newThread);
            slider.slidePage(PTB);
        });
        
        router.addRoute('thoughtJar/:user', function(user) { 
            var privateThoughts = connectorTop.request("thoughtJar", "find", "name", user);
            $('#container').append('<div id="thoughtJarUser"></div>');
            var TJ = $("#thoughtJarUser").html(thoughtJarUserTemplate(privateThoughts.thoughts));
            document.getElementById('composePrivateThoughtBtn').href = '#privateThoughtBuilder/' + privateThoughts.name;
            slider.slidePage(TJ);
        });
        
        router.addRoute('privateThoughtBuilder/:user', function(user) {
            $('#container').append('<div id="privateThoughtBuilder"></div>');
            var PTB = $("#privateThoughtBuilder").html(privateThoughtBuilderTemplate());
            document.getElementById("newPrivateThoughtBtn").addEventListener("click", newPrivateThought);
            slider.slidePage(PTB);
        });
        
        router.addRoute('thoughtFests', function() {
            var thoughtFestsList = connectorTop.request("thoughtFest", "get", "thoughts", null);
            $('#container').append('<div id="thoughtFests"></div>');
            var TF = $("#thoughtFests").html(thoughtFestsTemplate(thoughtFestsList));
            slider.slidePage(TF);
        });
        
        router.addRoute('thoughtFests/:id', function(id) {
            var thoughtFest = connectorTop.request("thoughtFest", "find", "id", parseInt(id));
            $('#container').append('<div id="thoughtFest"></div>');
            var TF = $("#thoughtFest").html(thoughtFestTemplate(thoughtFest.thoughts));
            document.getElementById('composeFestThoughtBtn').href = '#thoughtBuilderFest/' + id;
            slider.slidePage(TF);
        });
        
        router.addRoute('thoughtFestBuilder', function() {
            $('#container').append('<div id="thoughtFestBuilder"></div>');
            var TF = $("#thoughtFestBuilder").html(thoughtFestBuilderTemplate());
            document.getElementById("newThoughtFestBtn").addEventListener("click", newThoughtFest);
            slider.slidePage(TF);
        });
        
        router.addRoute('thoughtBuilderFest/:id', function(id) {
            $('#container').append('<div id="thoughtBuilderFest"></div>');
            var TF = $("#thoughtBuilderFest").html(thoughtBuilderFestTemplate());
            document.getElementById("newFestThoughtBtn").addEventListener("click", newFestThought);
            slider.slidePage(TF);
        });
        
        router.addRoute('refresh', function() {
            location.hash = "#thoughtCollector";
        });

        router.start();

    }
    
    
    this.updateView = function() {
        alert('updateView');
    }
    
    this.sendView = function() {
    
    }
    
    this.initialize();
    
    function newThought(){
        var body = document.getElementById('newThought').value;
        var name = connectorTop.request("profile", "get", "name", null);
        var datetime = getDateTime();
        var isAnon = $('#anonymity').prop('checked');
        var anonymity = false;
        var location = connectorTop.request("environment", "get", "location", null);
        if(isAnon){
            anonymity = true;
            name = 'Anonymous';
        }
        
        var newThought = {   
            "score": 4, 
            "author": name, 
            "date": datetime, 
            "anonymity": anonymity, 
            "target": "public", 
            "body": body,
            "latitude": location.latitude,
            "longitude": location.longitude
        };
        console.log('view mgr sending new thought to conntr ----------------------------------' + newThought.author);
        connectorTop.request("thoughtCollector", "append", null, newThought);
        window.location.hash = '#home';
    }
    
    function newThread(){
        var  target = document.getElementById('threadTarget').value;
        var body = document.getElementById('newPrivateThreadBody').value;
        var name = connectorTop.request("profile", "get", "name", null);
        var datetime = getDateTime();
        var anonymity = false;
        var newThought = {   
                                        "score": 4, 
                                        "author": name, 
                                        "date": datetime, 
                                        "anonymity": 0, 
                                        "target": target, 
                                        "body": body
                                    };
        
        var newThread = {
                                    "name": target,
                                    "name2": name,
                                    "date": datetime,
                                    "thoughts": [newThought]
                                };
        
        connectorTop.request("thoughtJar", "append", null, newThread);
        location.hash = '#home';
    }
    
    function newPrivateThought(){
        var user = getValueFromHash();
        var name = connectorTop.request("profile", "get", "name", null);
        var datetime = getDateTime();
        var body = $('#newPrivateThought').val();
        var anonymity = false;
        var newThought = {  
                                        "score": 4, 
                                        "author": name, 
                                        "date": datetime, 
                                        "anonymity": 0, 
                                        "target": "public", 
                                        "body": body,
                                    };
                    
        var newThread = {
                                    "name": user,
                                    "name2": name,
                                    "date": datetime,
                                    "thoughts": [newThought]
                                };
                           
        connectorTop.request("thoughtJar", "append", null, newThread);
        location.hash = '#thoughtJar';
    }
    
    function newThoughtFest(){
        var title = document.getElementById('newThoughtFestTitle').value;
        var newFest =   {   "title": title,
                                    "date": getDateTime(true),
                                    "author": connectorTop.request("profile", "get", "name", null),
                                    "id": -1,
                                    "thoughts": []
                                };
        connectorTop.request("thoughtFest", "add", null, newFest);
        location.hash = '#home';
    }
    
    function newFestThought(){
        var id = getValueFromHash();
        var body = document.getElementById('newFestThought').value;
        var name = connectorTop.request("profile", "get", "name", null);
        var datetime = getDateTime();
        var isAnon = $('#anonymityFestThought').prop('checked');
        var anonymity = false;
        if(isAnon){
            anonymity = true;
            name = 'Anonymous';
        }
        var newThought = {   
                                "score": 4, 
                                "author": name, 
                                "date": datetime, 
                                "anonymity": anonymity, 
                                "target": "public", 
                                "body": body
                            }
                            
        connectorTop.request("thoughtFest", "append", null, newThought, parseInt(id));
        location.hash = '#thoughtFests';
    }
    
    function refreshThoughtCollector(){
        location.hash = "#refresh";
    }
    
    
    // Utility Functions
    
    function getDateTime(isExpiration) {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        if(isExpiration){
            var day  = now.getDate() + 1;
        }
        else{
            var day  = now.getDate();
        }
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
            var month = '0'+month;
        }
        if(day.toString().length == 1) {
            var day = '0'+day;
        }   
        if(hour.toString().length == 1) {
            var hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            var minute = '0'+minute;
        }
        if(second.toString().length == 1) {
            var second = '0'+second;
        }   
        var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
    }
    
    function validated() {
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        var loginData = {
            "username" : username,
            "password" : password
        }
        
        var newData = {
                    "componentName": "profile",
                    "action": "login",
                    "resource": loginData
        };
                
        //if( connectorTop.request("profile", "get", "password", null) == password && connectorTop.request("profile", "get", "username", null) == username){
        connectorTop.request("webServer", "login", "profile", newData);
    }
    
    this.login = function(result){
        if( result){
            location.hash = "#home";
        }
        else{
            document.getElementById('login_notification').style.display = 'inline';
        }
    }
    
    function getValueFromHash(){
        return location.hash.split("/")[1]; 
    }

}