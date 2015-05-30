
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
query = client.query ('CREATE TABLE user (USERNAME VARCHAR(15) PRIMARY KEY , PASSWORD VARCHAR(15) , ID SERIAL UNIQUE , BOOLEAN LOGIN DEFAULT FALSE)'); 
for ( var id = 0 ; id <4 ; id++){

query = client.query('INSERT INTO user (username , password) VALUES($1, $2)', [usr[id].username , usr[id].password]);
}
query.on('end', function(result) { client.end(); });



