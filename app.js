var express = require("express")
, http = require("http")
, path = require("path")
, db = require("./models")
, exctrl = require('exctrl');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))
 
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}
 
exctrl.load(app, {pattern: __dirname + '/controllers/*.js'});

db
  .sequelize
  .sync({ force: false })
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })