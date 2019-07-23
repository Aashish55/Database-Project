const path = require('path')
const express = require('express')
const mysql= require('mysql')
const bodyParser = require('body-parser')
const hbs = require('hbs');
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/template/views'));
app.use(express.static(path.join(__dirname, '/public')));


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'populationcensus'
});
connection.connect((err)=> {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected to MySQL server successfully');
  });

app.get('/', (req, res) => {
    res.render('index.hbs');
})

app.get('/entry', (req, res) => {
    res.render('dataEntry.hbs');
})
app.get('/statistics',(req,res)=>{
    var maleValue;
    connection.query("SELECT gender FROM person WHERE person.gender='male'",  (err, result, fields)=> {
      if (err) throw err;
      
      maleValue=result.length
    });
    res.render('statistics',{maleValue:maleValue, head : "hello world!"});
})

app.post('/submitperson',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO Person values(null,'" +req.body.personName+"','"+req.body.gender+"','"+req.body.DOB+"','"+req.body.marital+"','"+req.body.religion+"','"+req.body.literacy + "');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.redirect('/entry')
        })
    connection.end();
})

app.post('/submitaddress',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO address values('" +req.body.zipcode+"','"+req.body.housenumber+"','"+req.body.provincenumber+"','"+req.body.municipality+"','"+req.body.ward+"','"+req.body.city + "','"+req.body.tole + "');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.redirect('/entry')
        })
    connection.end();
})


app.post('/submitfamilyinformation',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO family_information values('" +req.body.housenumber+"','"+req.body.numberofmale+"','"+req.body.numberoffemale+"','"+req.body.numberofchildren+"','"+req.body.earningnumber+"','"+req.body.dependentnumber + "','"+req.body.disablednumber + "','"+req.body.literatenumber + "','"+req.body.paddress + "');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.redirect('/entry')
        })
    connection.end();
})


app.post('/submithouseinformation',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO house values('" +req.body.housenumber+"','"+req.body.owner+"','"+req.body.type+"','"+req.body.insurance+"','"+req.body.sourceoflight+"','"+req.body.sourceoffuel + "');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.redirect('/entry')
        })
    connection.end();
})


app.post('/submithousestructure',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO structure values('" +req.body.housenumber+"','"+req.body.type+"','"+req.body.roofingtype+"','"+req.body.earthquake+"','"+req.body.numberofstorey+"','"+req.body.numberofrooms + "','"+req.body.latrine + "');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.redirect('/entry')
        })
    connection.end();
})

app.post('/submitarea',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO land_information values('" +req.body.housenumber+"','"+req.body.type+"','"+req.body.area+"');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.redirect('/entry')
        })
    connection.end();
})

app.post('/submitluxury',(req,res)=>{

    console.log(req.body);
    var sql = "INSERT INTO luxury values('" +req.body.housenumber+"','"+req.body.vehicles+"','"+req.body.internet+"','"+req.body.cellphone+"');";
    connection.query(sql,(err)=>{
        if(err) throw err;
        console.log('value inserted successfully');
        res.render('/entry')
        })
    connection.end();
})


app.listen(3000, () => {
    console.log('Listening to the port: ', 3000);
})