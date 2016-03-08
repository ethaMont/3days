function route(app) {
    app.param(function(name, fn){
        if (fn instanceof RegExp) {
            return function(req, res, next, val){
                var captures;
                if (captures = fn.exec(String(val))) {
                    req.params[name] = captures;
                    next();
                } else {
                    next('route');
                }
            }
        }
    });
    
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/index.html'));    
    });
    app.get('/trips', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/index.html'));    
    });
    app.get('/trip', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/index.html'));    
    });
    app.get('/main.js', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/main.js'));    
    });
    app.get('/vendor.js', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/vendor.js'));    
    });
    app.get('/styles/styles.css', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/styles.css'));    
    });
    app.get('/styles.css', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/styles.css'));    
    });
    
    app.param('id', function (req, res, next, id) {
        next();
    });

    app.get('/trip/:id', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../target/index.html'));    
    });
}

exports.route = route