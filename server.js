const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('Caps_it', (text)=>{
    return text.toUpperCase()
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.path}`;
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
            console.log('unable to log the file');
        };
    });
    console.log(`${now} : ${req.method} : ${req.path}`)
    next();
});

// app.use((req, res,next)=>{
//         res.render('maintenance.hbs');
//     });
    
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
    res.render('home.hbs',{
        pageTitle : 'Home page',
        welcomeMessage : "welcome to my website"
        
    });
});

app.get('/about', function(req,res){
    res.render('about.hbs',{
        pageTitle : 'About Page',
        welcomeMessage : 'This is about page'
        
    });
});



app.get('/bad', function(req,res){
    res.send({
        errorMessage : "Error page not found"
    });
});


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});