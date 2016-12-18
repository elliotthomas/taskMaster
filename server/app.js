var express = require('express')
var app = express ();
var path = require('path');
var bodyParser = require ('body-parser')
var pg = require('pg');
var urlEncodedParser = bodyParser.urlencoded({ extended:true });
var port = process.env.PORT || 8080;

var connectionString = 'postgres://localhost:5432/task-master';

app.listen(port, function ( req, res ){
  console.log('server is listening on:', port);
});//end app listen

app.get ('/', function( req, res ){
  console.log('Base URL hit');
  res.sendFile(path.resolve('public/index.html'));
});//end app get for base URL

app.post('/postTask', urlEncodedParser, function( req, res ){
  console.log('creating new task', req.body);
  //connecting to the database
  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log('error in connecting to database');
    } else{
      client.query('INSERT INTO tasks (task, complete) values($1, $2)', [req.body.newTask, req.body.complete]);
    }//end else statment
  });//end pg connect to database
});//end post task

app.get ('/')


app.use(express.static('public'));
