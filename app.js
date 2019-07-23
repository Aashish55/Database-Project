const path = require('path')
const express = require('express')
const hbs = require('hbs');

const app = express();
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/template/views'));


app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('index.hbs');
})

app.get('/entry', (req, res) => {
    res.render('dataEntry.hbs');
})

app.listen(3000, () => {
    console.log('Listening to the port: ', 3000);
})