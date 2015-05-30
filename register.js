
// use the express middleware
var express = require('express');

// make express handle JSON and other requests
var bodyParser = require('body-parser');

// use cross origin resource sharing
var cors = require('cors');

var passwordHash = require('password-hash-and-salt'); 
// instantiate app
var app = express()
  , pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();

// make sure we can parse JSON
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static(__dirname));

// make sure we use CORS to avoid cross domain problems
app.use(cors());

app.get('/' , function(req, res){
     res.sendfile('index.html');

});

app.get('/hash' , function(req,res){
password('mysecret').hash(function(error, hash) {
    if(error)
        throw new Error('Something went wrong!');
 
    // Store hash (incl. algorithm, iterations, and salt) 
   res.send(hash) ; 
   });

});

app.post('/login' , function(req, res){
console.log(req.body.username,  req.body.password) ;
var user =  {
username: req.body.username , 
password : req.body.password
};

query = client.query ( 'SELECT COUNT(*) FROM userlogin WHERE username = $1 AND password = $2' ,[user.username , user.password], function(err) {
	if (err) {
	   console.log('error in finding @select : user and password') ;
	   res.statusCode = 404;
	   //res.send("Error 404 , Can not find user ") ;
	   res.redirect('/');
	}
});
query.on ('row' , function(result){
	if(result.count ==1 ) {
	   query= client.query( 'UPDATE userlogin SET login = true WHERE username = $1 AND password = $2' , [user.username , user.password], function (err) { 
	   if(err) {
		console.log('err at update' + err.message);
	   	res.statusCode =404 ; 
//		res.send("Error" + err.message) ; 
		res.redirect('/');
	   }else { 
		console.log('login');		
		res.statusCode =200 ; 
	  	res.send("OK");
	   }

	  });//
 	}else {
	   console.log('error result not 1', result);
	   res.statusCode =404 ;
	   //res.send("Error : invalide username or password ");
	   res.redirect('/');

	}

//res.send("df");
});



});

// use PORT set as an environment variable
var server = app.listen(process.env.PORT, function() {
    console.log('Listening on port %d', server.address().port);
                                                                
});
