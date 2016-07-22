var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('cheflist',['cheflist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());

app.get('/cheflist',function(req,res){
  console.log('I received a GET request from cheflist');
  db.cheflist.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/cheflist',function(req,res) {
  console.log(req.body);
  db.cheflist.insert(req.body,function(err,doc) {
    res.json(doc);
  });
});

app.delete('/cheflist/:id',function(req,res){
  var id = req.params.id;
  console.log(id);
  db.cheflist.remove({_id:mongojs.ObjectId(id)},function(err,doc) {
    res.json(doc);
  });
});

app.get('/cheflist/:id',function(req,res) {
  var id = req.params.id;
  console.log(id);
  db.cheflist.findOne({_id:mongojs.ObjectId(id)},function(err,doc) {
    res.json(doc);
  });
});


app.put('/cheflist/:id',function(req,res){
  var id = req.params.id;
  console.log(req.body.name);

  console.log(req.body.age);
  db.cheflist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, age: req.body.age}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(2000);
console.log("server running on port 3000");
