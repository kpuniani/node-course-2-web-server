const express =require('express');
const hbs= require('hbs');
const fs= require('fs');

const port=process.env.PORT || 3000;
var app=express();
hbs.registerPartials(__dirname + '/views/partials')  //to use partials it should be registered.
app.set('view engine','hbs');


hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});

hbs.registerHelper('doCapitals',(text)=>{
return text.toUpperCase();
});

app.use((req,res,next)=>{
  var time =new Date().toString();
  var log =`${time} : ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log +'\n')
next();
});


/*app.use((req,res,next)=>{
res.render('maintaince.hbs',{
PageTitle:"Something went wrong",
WelcomeMessage:"We will come back soon"
});
});*/
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
  res.render('home.hbs',{
  PageTitle:'You are welcome',
  WelcomeMessage:"welcome to our website"
  });
});
app.get('/about',(req,res)=>{
res.render('about.hbs',{
PageTitle:'About Page',
WelcomeMessage:"welcome to about page website"
});
});


app.get('/bad',(req,res)=>{
 res.send({
errorMessage:'This is a bad request'
 });
});
app.listen(port,()=>{
  console.log(`Server is up on${port}`);
});
