
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

app.get('/:name/check' , function (req, res){
var array = []; 	
query = client.query('SELECT username FROM userloginHash WHERE username = $1', [req.params.name], function (err ,result){
if(err){res.send(err.message); }
if (!result ){res.send("fff");}

});
query.on('row', function(result) { 

if(!result) {res.send("life suck"); }
else { array.push(result) ;res.send(result); }
if(array.length == 0) res.send("nothing");  
  
});

})


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


 

//console.log("hash Stroed");
/*
for (var id = 0 ; id < 4 ; id++ ){ 
query = client.query('INSERT INTO userloginHash (username ,hash) VALUES($1, $2)', [usr[id].usrname, usr[id].hash], function (err){
	if(err) { console.log("error in inserting"); res.send(err.message) ; }
	//else {console.log ("inserting successs") ; res.redirect('/');}
});
}*/
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
	if(results.length < 1 ) { console.log(" null "); res.redirect('/'); }
});
query.on('row', function(result){
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

app.get('/tokenTest', function (req, res){
if(req.headers.accessToken != 'welcome to the nothing site'){res.statusCode =401 ; res.send('Unauthorize'); }
else { res.statusCode =200 ; res.send('What the secret') ; }
});


/*
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
*/
// use PORT set as an environment variable
var server = app.listen(process.env.PORT, function() {
    console.log('Listening on port %d', server.address().port);
                                                                
});
