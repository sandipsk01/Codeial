const express=require('express');
const cookieParser=require('cookie-parser')
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const flash =require('connect-flash');
const customMware=require('./config/middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded({extended:true}));    //body-parser deprecated undefined extended: provide extended option

app.use(cookieParser());
app.use(express.static('./assets')); 

app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{   //cookie to give session time
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://0.0.0.0/codeial_development',
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err||'connect-mongo setup ok');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// after session bcoz connect flash uses session cookies
app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes'));   // "/"  is sent to "./routes"

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
}); 