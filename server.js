const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://medinageyer:demo@fullstack.qefrkm5.mongodb.net/workouts?retryWrites=true&w=majority&appName=fullStack";
const dbName = "workouts";

app.listen(2500, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('workouts').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {workouts: result})
  })
})

app.post('/workouts', (req, res) => {
  db.collection('workouts').insertOne({
    name: req.body.name, 
    type: req.body.type, 
    muscle: req.body.muscle, 
    equipment: req.body.equipment, 
    difficulty: req.body.difficulty,
    instructions: req.body.instructions,
    thumbUp: 0, 
    thumbDown:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/workouts/thumbUp', (req, res) => {
  db.collection('workouts')
  .findOneAndUpdate({
    name: req.body.name, 
    type: req.body.type, 
    muscle: req.body.muscle, 
    equipment: req.body.equipment, 
    difficulty: req.body.difficulty
  }, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true //creating a new list item 
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/workouts/thumbDown', (req, res) => {
  db.collection('workouts')
  .findOneAndUpdate({
    name: req.body.name, 
    type: req.body.type, 
    muscle: req.body.muscle, 
    equipment: req.body.equipment, 
    difficulty: req.body.difficulty
  }, {
    $set: {
      thumbUp:req.body.thumbUp -1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.delete('/workouts', (req, res) => {
  db.collection('workouts').findOneAndDelete({ 
    name: req.body.name, 
    type: req.body.type, 
    muscle: req.body.muscle, 
    equipment: req.body.equipment, 
    difficulty: req.body.difficulty
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Workout deleted!')
  })
})
