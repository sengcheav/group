
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
/*
app.post('/update/:lv' , function (req, res){
if(!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('point')){
console.log( "please specify what lvl need to update') ;
res.statusCode = 400;
return res.send('Error 400: Post syntax incorrect.');

}  
var obj  = {
username : req.body.username,
point : req.body.point
};
// assuming the username is correct that why it can do the updating

var lvl = 





};
*/

app.post ('/createAdmin' , function(req,res){
/*var usr = [
        {username : 'seng', password : 'invalid'},
        {username : 'seng1', password : 'invalid1'},
        {username : 'seng2', password : 'invalid2'},
        {username : 'seng3', password : 'invalid3'}

];*/



passwordHash('invalid').hash(function(error, hash) {
    if(error)
        throw new Error('Something went wrong!');
    // Store hash (incl. algorithm, iterations, and salt) 
    var userhash = hash;
    for (var id = 0 ; id < 4 ; id++ ){
    query = client.query('INSERT INTO userloginHash (username ,hash) VALUES($1, $2)', ['seng'+id, userhash]);//, function (err){
    } //if(err) { console.log("error in inserting"+ err.message); res.send(err.message) ; }
    
});	
console.log ("hash in DB");
res.redirect ('/');
});


app.post('/login', function(req,res){
var user =  {
username: req.body.username ,
password : req.body.password
};

query = client.query ( 'SELECT count(*) as count ,  hash FROM userloginHash WHERE username = $1 group by hash ',[user.username ], function(err,results) {

	if(err) { console.log( "sth went wrong and select" + err.message ) ; res.redirect ('/'); }
	if(!results) { console.log(" null "); res.redirect('/'); }
});
query.on('row', function( result){ 
	if(result == null) res.redirect('/');
	if(!result ){ res.statusCode = 404; console.log("invalid username or password"); res.redirect('/'); }
        else {console.log("result ------------------" + result.count) ; 
	  // if(results.length < 1 ) {console.log ("result is 0 ") ; res.statusCode = 404 ; res.redirect('/');}
		passwordHash(user.password).verifyAgainst(result.hash, function(error, verified) {
		if(error){ console.log("Error comparing hash : "+  error.message); res.statusCode = 400 ; res.redirect('/') ;}
		if(!verified){ console.log("Invalid password"); res.statusCode = 404 ; res.redirect('/') ; } 
		else { console.log("Got verified but still need to update" );
	            query= client.query( 'UPDATE userloginHash SET login = true WHERE username = $1 ' , [user.username], function (err) {
          		 if(err) {
               			 console.log('err at update' + err.message);
               			 res.statusCode =404 ;
				 res.redirect('/');
          		 }else {
               			 console.log('login');
             		         res.statusCode =200 ; 
				 res.setHeader('accessToken', 'welcome to the nothing site');  
             		         res.send("OK");
          		 } 

        	     });//




		}

	   });		
	}


});


});
// hasnt work yet 
app.get('/tokenTest', function (req, res){
if(req.headers.accessToken != 'welcome to the nothing site'){res.statusCode =401 ; res.send('Unauthorize'); }
else { res.statusCode =200 ; res.send('What the secret') ; }
});

â‰


// use PORT set as an environment variable
var server = app.listen(process.env.PORT, function() {
    console.log('Listening on port %d', server.address().port);
                                                                
});
