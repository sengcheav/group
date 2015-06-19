
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
//
/*query = client.query('DROP TABLE userloginHash') ;
query = client.query('CREATE TABLE userloginHash ( USERNAME VARCHAR(15) PRIMARY KEY, HASH VARCHAR(512), ID SERIAL UNIQUE, LOGIN BOOLEAN DEFAULT FALSE)');

query = client.query('CREATE TABLE ranking ( USERNAME VARCHAR(15) PRIMARY KEY , POINTS 
INTEGER DEFAULT 0 CHECK ( POINTS >=0 ), LV1 INTEGER DEFAULT 0 , LV2 INTEGER DEFAULT 0 , LV3 INTEGER DEFAULT 0 , LV4 INTEGER DEFAULT 0 , LV5 INTEGER DEFAULT 0 , LV6 INTEGER DEFAULT 0 , LV7 INTEGER DEFAULT 0 , LV8 INTEGER DEFAULT 0, LV9 INTEGER DEFAULT 0 , LV10 INTEGER DEFAULT 0)'); 
*/
query = client.query(' CREATE TABLE rank (USERNAME VARCHAR(15) PRIMARY KEY, TOTALPOINTS INTEGER DEFAULT 0 CHECK (TOTALPOINTS >=0 ) , POINTS_LVL INTEGER[10] DEFAULT 0 , LVL_BEST INTEGER[10] DEFAULT 0 ') ;
query.on('end', function(result) { client.end(); });



