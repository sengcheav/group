
var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query ;

var usr = [
        {username : 'seng', password : 'invalid'},
        {username : 'lol', password : 'invalid'},
        {username : 'haha', password : 'invalid'},
        {username : 'yobro', password : 'invalid'}

];

client = new pg.Client(connectionString);
client.connect();
//query = client.query ('CREATE TABLE userlogin ( USERNAME VARCHAR(15) PRIMARY KEY , 
//PASSWORD VARCHAR(15) , ID SERIAL UNIQUE ,  LOGIN BOOLEAN DEFAULT FALSE)'); 
//for ( var id = 0 ; id <4 ; id++){
//
//query = client.query('INSERT INTO userlogin (username , password) VALUES($1, $2)', 
//[usr[id].username , usr[id].password]);
//}
query = client.query('DROP TABLE userloginHash) ;
query = client.query('CREATE TABLE userloginHash ( USERNAME VARCHAR(15) PRIMARY KEY, HASH CHAR(256), ID SERIAL UNIQUE, LOGIN BOOLEAN DEFAULT FALSE)');
query.on('end', function(result) { client.end(); });



