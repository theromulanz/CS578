// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
// Components are connected here.
(function () {
    // Initialize Conncectors

    var connector1= new Connector();
    var connector2 = new Connector();
    
    // Initialize Components
    var cacheService = new CacheService(connector2, null);
    var environment = new Environment(null, connector2);
    var profile = new Profile(null, connector2);
    var thoughtBuilder = new ThoughtBuilder(connector2, connector1);
    var thoughtCollector = new ThoughtCollector(null, connector2);
    var thoughtFest = new ThoughtFest(null, connector2);
    var thoughtJar = new ThoughtJar(null, connector2);
    var viewManager = new ViewManager(connector2, connector1);
    var webServer = new WebServer();

    // Attach components

    connector2.attachTop(profile, "profile");
    connector2.attachTop(thoughtCollector, "thoughtCollector");
    connector2.attachTop(thoughtJar, "thoughtJar");
    connector2.attachTop(thoughtFest, "thoughtFest");
    connector2.attachTop(webServer, "webServer");
    connector2.attachTop(environment, "environment");
    connector2.attachBottom(cacheService, "cacheService");
    connector2.attachBottom(viewManager, "viewManager");
    
    cacheService.initialize();
    
    var location = environment.getLocation();
   
    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function () {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#ffffff');
        StatusBar.styleDefault();
        FastClick.attach(document.body);
    }, false);

}());