const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
const host = '0.0.0.0';

const fetch = require('./fetch');

app.set('view engine','ejs');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/',function(req,res){
        res.render('home', {
            data:[]
        });

});


app.post('/fetch', fetch.posTagger)

app.listen(port, host, () => console.log(`Server listening on ${host+":"+port}!`))
