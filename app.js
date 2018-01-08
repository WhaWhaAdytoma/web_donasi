var express = require('express')
var app = express()
var mysql = require('mysql')


var path = require('path');
var router = express.Router();
var logger = require('morgan');

//path
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));




var myConnection  = require('express-myconnection')
var config = require('./config')
var dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
app.use(myConnection(mysql, dbOptions, 'pool')) 
app.set('view engine', 'ejs')



var expressValidator = require('express-validator')
app.use(expressValidator())


/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({ 
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())


/**
 * import routes/index.js
 * import routes/users.js
 */ 
var index = require('./routes/index')
var users = require('./routes/users')
var admin_ = require('./routes/admin_')
var guest_ = require('./routes/guest_')
var campaign_ = require('./routes/campaign_')
var rekening_ = require('./routes/rekening_')
var pre_transaksi_ = require('./routes/pre_transaksi_')
var konfirmasi_bayar_ = require('./routes/konfirmasi_bayar_')
var campaign1_ = require('./routes/campaign1_')
var konfirmasi_bayar1_ = require('./routes/konfirmasi_bayar1_')
var login1_ = require('./routes/login1_')

app.use('/', index)
app.use('/users', users)
app.use('/admin_', admin_)
app.use('/guest_', guest_)
app.use('/campaign_', campaign_)
app.use('/rekening_', rekening_)
app.use('/pre_transaksi_', pre_transaksi_)
app.use('/konfirmasi_bayar_', konfirmasi_bayar_)

//view user guest
app.use('/campaign1_', campaign1_)
app.use('/konfirmasi_bayar1_', konfirmasi_bayar1_)
app.use('/login1_', login1_)

app.listen(3550, function(){
	console.log('Server running at port 3000: http://127.0.0.1:3000')
})